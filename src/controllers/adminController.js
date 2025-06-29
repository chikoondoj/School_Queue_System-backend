const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class AdminController {
  // Get dashboard overview
  async getDashboard(req, res) {
    try {
      // Get all services with queue counts
      const services = await prisma.service.findMany({
        where: { isActive: true },
        include: {
          _count: {
            select: {
              queueEntries: {
                where: { status: 'WAITING' }
              }
            }
          }
        }
      });

      // Get currently being served across all services
      const currentlyServing = await prisma.queueEntry.findMany({
        where: { status: 'BEING_SERVED' },
        include: {
          user: {
            select: {
              name: true,
              studentCode: true,
              course: true,
              year: true
            }
          },
          service: {
            select: {
              name: true
            }
          }
        }
      });

      // Get today's statistics
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const todayStats = await prisma.queueHistory.groupBy({
        by: ['status'],
        where: {
          createdAt: {
            gte: today,
            lt: tomorrow
          }
        },
        _count: {
          status: true
        }
      });

      const stats = {
        totalServedToday: todayStats.find(s => s.status === 'COMPLETED')?._count?.status || 0,
        totalCancelledToday: todayStats.find(s => s.status === 'CANCELLED')?._count?.status || 0,
        currentlyWaiting: await prisma.queueEntry.count({
          where: { status: 'WAITING' }
        }),
        currentlyServing: currentlyServing.length
      };

      res.json({
        success: true,
        data: {
          services: services.map(service => ({
            id: service.id,
            name: service.name,
            description: service.description,
            waitingCount: service._count.queueEntries,
            isActive: service.isActive
          })),
          currentlyServing,
          stats
        }
      });

    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get dashboard data',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get detailed queue for a specific service
  async getServiceQueue(req, res) {
    try {
      const { serviceId } = req.params;

      const service = await prisma.service.findUnique({
        where: { id: parseInt(serviceId) }
      });

      if (!service) {
        return res.status(404).json({
          success: false,
          message: 'Service not found'
        });
      }

      const queueEntries = await prisma.queueEntry.findMany({
        where: {
          serviceId: parseInt(serviceId),
          status: {
            in: ['WAITING', 'BEING_SERVED']
          }
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              studentCode: true,
              course: true,
              year: true
            }
          }
        },
        orderBy: {
          createdAt: 'asc'
        }
      });

      res.json({
        success: true,
        data: {
          service,
          queue: queueEntries.map((entry, index) => ({
            id: entry.id,
            position: entry.status === 'WAITING' ? index + 1 : 'Being Served',
            student: entry.user,
            status: entry.status,
            joinedAt: entry.createdAt,
            waitTime: this.calculateWaitTime(entry.createdAt)
          })),
          summary: {
            totalWaiting: queueEntries.filter(e => e.status === 'WAITING').length,
            currentlyServing: queueEntries.filter(e => e.status === 'BEING_SERVED').length
          }
        }
      });

    } catch (error) {
      console.error('Get service queue error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get service queue',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Call next student in queue
  async callNext(req, res) {
    try {
      const { serviceId } = req.params;

      // First, complete any currently being served
      await prisma.queueEntry.updateMany({
        where: {
          serviceId: parseInt(serviceId),
          status: 'BEING_SERVED'
        },
        data: {
          status: 'COMPLETED',
          completedAt: new Date()
        }
      });

      // Get the next waiting student
      const nextStudent = await prisma.queueEntry.findFirst({
        where: {
          serviceId: parseInt(serviceId),
          status: 'WAITING'
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              studentCode: true,
              course: true,
              year: true
            }
          },
          service: {
            select: {
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'asc'
        }
      });

      if (!nextStudent) {
        return res.status(404).json({
          success: false,
          message: 'No students waiting in queue'
        });
      }

      // Update next student to being served
      const updatedEntry = await prisma.queueEntry.update({
        where: { id: nextStudent.id },
        data: { status: 'BEING_SERVED' },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              studentCode: true,
              course: true,
              year: true
            }
          },
          service: {
            select: {
              name: true
            }
          }
        }
      });

      // Emit socket event for real-time updates
      req.io.to(`service-${serviceId}`).emit('queue-updated', {
        type: 'NEXT_CALLED',
        serviceId: parseInt(serviceId),
        student: updatedEntry.user,
        timestamp: new Date()
      });

      res.json({
        success: true,
        message: `Called ${updatedEntry.user.name} for ${updatedEntry.service.name}`,
        data: {
          calledStudent: {
            id: updatedEntry.id,
            student: updatedEntry.user,
            service: updatedEntry.service.name,
            status: updatedEntry.status,
            joinedAt: updatedEntry.createdAt
          }
        }
      });

    } catch (error) {
      console.error('Call next error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to call next student',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Complete current service
  async completeService(req, res) {
    try {
      const { serviceId } = req.params;

      const currentlyServing = await prisma.queueEntry.findFirst({
        where: {
          serviceId: parseInt(serviceId),
          status: 'BEING_SERVED'
        },
        include: {
          user: true,
          service: true
        }
      });

      if (!currentlyServing) {
        return res.status(404).json({
          success: false,
          message: 'No student currently being served'
        });
      }

      // Update status to completed
      await prisma.queueEntry.update({
        where: { id: currentlyServing.id },
        data: {
          status: 'COMPLETED',
          completedAt: new Date()
        }
      });

      // Add to history
      await prisma.queueHistory.create({
        data: {
          userId: currentlyServing.userId,
          serviceId: currentlyServing.serviceId,
          serviceName: currentlyServing.service.name,
          userName: currentlyServing.user.name,
          userCode: currentlyServing.user.studentCode,
          status: 'COMPLETED',
          completedAt: new Date()
        }
      });

      // Emit socket event
      req.io.to(`service-${serviceId}`).emit('queue-updated', {
        type: 'SERVICE_COMPLETED',
        serviceId: parseInt(serviceId),
        timestamp: new Date()
      });

      res.json({
        success: true,
        message: `Service completed for ${currentlyServing.user.name}`
      });

    } catch (error) {
      console.error('Complete service error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to complete service',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get queue history
  async getQueueHistory(req, res) {
    try {
      const { page = 1, limit = 20, serviceId, status, date } = req.query;
      const skip = (page - 1) * limit;

      let where = {};

      if (serviceId) {
        where.serviceId = parseInt(serviceId);
      }

      if (status) {
        where.status = status;
      }

      if (date) {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        where.completedAt = {
          gte: startDate,
          lte: endDate
        };
      }

      const [history, total] = await Promise.all([
        prisma.queueHistory.findMany({
          where,
          orderBy: {
            completedAt: 'desc'
          },
          skip: parseInt(skip),
          take: parseInt(limit),
          include: {
            service: {
              select: {
                name: true
              }
            }
          }
        }),
        prisma.queueHistory.count({ where })
      ]);

      res.json({
        success: true,
        data: {
          history,
          pagination: {
            currentPage: parseInt(page),
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            hasNext: skip + parseInt(limit) < total,
            hasPrev: parseInt(page) > 1
          }
        }
      });

    } catch (error) {
      console.error('Get history error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get queue history',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Add this method to your AdminController class

async cancelService(req, res) {
  try {
    const { queueId } = req.body;

    if (!queueId) {
      return res.status(400).json({
        success: false,
        message: 'Queue ID is required'
      });
    }

    // Find the queue entry
    const queueEntry = await prisma.queueEntry.findUnique({
      where: { id: parseInt(queueId) },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            studentCode: true,
            course: true,
            year: true
          }
        },
        service: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!queueEntry) {
      return res.status(404).json({
        success: false,
        message: 'Queue entry not found'
      });
    }

    // Check if already cancelled or completed
    if (queueEntry.status === 'CANCELLED') {
      return res.status(400).json({
        success: false,
        message: 'Service is already cancelled'
      });
    }

    if (queueEntry.status === 'COMPLETED') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a completed service'
      });
    }

    // Update the queue entry status to cancelled
    const updatedQueue = await prisma.queueEntry.update({
      where: { id: parseInt(queueId) },
      data: {
        status: 'CANCELLED',
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            studentCode: true,
            course: true,
            year: true
          }
        },
        service: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    // Add to history
    await prisma.queueHistory.create({
      data: {
        userId: queueEntry.userId,
        serviceId: queueEntry.serviceId,
        serviceName: queueEntry.service.name,
        userName: queueEntry.user.name,
        userCode: queueEntry.user.studentCode,
        status: 'CANCELLED',
        completedAt: new Date()
      }
    });

    // Emit socket event for real-time updates if socket is available
    if (req.io) {
      req.io.to(`service-${queueEntry.serviceId}`).emit('queue-updated', {
        type: 'SERVICE_CANCELLED',
        serviceId: queueEntry.serviceId,
        queueId: queueEntry.id,
        student: queueEntry.user,
        timestamp: new Date()
      });
    }

    res.json({
      success: true,
      message: `Service cancelled for ${updatedQueue.user.name}`,
      data: {
        cancelledEntry: {
          id: updatedQueue.id,
          student: updatedQueue.user,
          service: updatedQueue.service,
          status: updatedQueue.status,
          cancelledAt: updatedQueue.updatedAt
        }
      }
    });

  } catch (error) {
    console.error('Cancel service error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel service',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

  // Helper method to calculate wait time
  calculateWaitTime(joinedAt) {
    const now = new Date();
    const diffMs = now - new Date(joinedAt);
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} mins`;
    } else {
      const hours = Math.floor(diffMins / 60);
      const mins = diffMins % 60;
      return `${hours}h ${mins}m`;
    }
  }
}

module.exports = new AdminController();