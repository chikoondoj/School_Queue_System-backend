const queueService = require('../services/queueService');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

class QueueController {
  // Join a queue
  async joinQueue(req, res) {
    try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("Request body:", req.body);
  console.log("Request user:", req.user);

  const { serviceType } = req.body;
  const studentId = req.user?.id;

  if (!studentId) {
    throw new Error("studentId is undefined");
  }

  const existingTicket = await queueService.getActiveTicketByStudent(studentId);
  console.log("Existing ticket:", existingTicket);

  if (existingTicket) {
    return res.status(400).json({ 
      error: 'You are already in a queue',
      ticket: existingTicket 
    });
  }

  const ticket = await queueService.addToQueue(studentId, serviceType);
  console.log("New ticket:", ticket);

  if (!req.io) {
    console.error("Socket.IO instance not attached");
  } else {
    req.io.emit('queueUpdate', {
      type: 'STUDENT_JOINED',
      service: serviceType,
      ticket: ticket
    });
  }

  res.status(201).json({
    message: 'Successfully joined the queue',
    ticket: ticket
  });
} catch (error) {
  console.error('Join queue error:', error);
  res.status(500).json({ error: 'Failed to join queue' });
}

  }

  // Get queue status for a service
  async getQueueStatus(req, res) {
    try {
      const { serviceType } = req.params;
      const queueData = await queueService.getQueueByService(serviceType);
      
      res.json({
        service: serviceType,
        totalInQueue: queueData.length,
        currentlyServing: queueData.find(ticket => ticket.status === 'serving'),
        nextInLine: queueData.find(ticket => ticket.status === 'waiting'),
        estimatedWaitTime: queueData.length * 15 // 15 minutes per person
      });
    } catch (error) {
      console.error('Get queue status error:', error);
      res.status(500).json({ error: 'Failed to get queue status' });
    }
  }

  // Get student's current ticket
  async getMyTicket(req, res) {
    try {
      const studentId = req.user.id;
      const ticket = await queueService.getActiveTicketByStudent(studentId);
      
      if (!ticket) {
        return res.status(404).json({ message: 'No active ticket found' });
      }

      res.json({ ticket });
    } catch (error) {
      console.error('Get ticket error:', error);
      res.status(500).json({ error: 'Failed to get ticket' });
    }
  }

  // Admin: Get all queues overview
  async getAdminOverview(req, res) {
    try {
      const overview = await queueService.getAdminOverview();
      res.json(overview);
    } catch (error) {
      console.error('Admin overview error:', error);
      res.status(500).json({ error: 'Failed to get admin overview' });
    }
  }

  // Admin: Call next student
  async callNextStudent(req, res) {
    try {
      const { serviceType } = req.body;
      const adminId = req.user.id;

      const result = await queueService.callNextStudent(serviceType, adminId);
      
      if (!result) {
        return res.status(404).json({ message: 'No students waiting in queue' });
      }

      // Emit real-time update
      req.io.emit('queueUpdate', {
        type: 'STUDENT_CALLED',
        service: serviceType,
        ticket: result
      });

      res.json({
        message: 'Student called successfully',
        ticket: result
      });
    } catch (error) {
      console.error('Call next student error:', error);
      res.status(500).json({ error: 'Failed to call next student' });
    }
  }

  // Admin: Complete service for current student
  async completeService(req, res) {
    try {
      const { ticketId, notes } = req.body;
      const adminId = req.user.id;

      const result = await queueService.completeService(ticketId, adminId, notes);
      
      // Emit real-time update
      req.io.emit('queueUpdate', {
        type: 'SERVICE_COMPLETED',
        ticket: result
      });

      res.json({
        message: 'Service completed successfully',
        ticket: result
      });
    } catch (error) {
      console.error('Complete service error:', error);
      res.status(500).json({ error: 'Failed to complete service' });
    }
  }

  // Student: Leave queue
  async leaveQueue(req, res) {
    try {
      const studentId = req.user.id;
      const result = await queueService.leaveQueue(studentId);

      if (!result) {
        return res.status(404).json({ message: 'No active ticket found' });
      }

      // Emit real-time update
      req.io.emit('queueUpdate', {
        type: 'STUDENT_LEFT',
        ticket: result
      });

      res.json({
        message: 'Successfully left the queue',
        ticket: result
      });
    } catch (error) {
      console.error('Leave queue error:', error);
      res.status(500).json({ error: 'Failed to leave queue' });
    }
  }

  // Get queue history for reports
  async getQueueHistory(req, res) {
    try {
      const { startDate, endDate, serviceType } = req.query;
      const history = await queueService.getQueueHistory({
        startDate,
        endDate,
        serviceType
      });

      res.json({ history });
    } catch (error) {
      console.error('Get queue history error:', error);
      res.status(500).json({ error: 'Failed to get queue history' });
    }
  }

  // Get available services
async getServices(req, res) {
  try {
    // Define available services - you can modify this based on your needs
    const services = [
      {
        id: 'registrar',
        name: 'Registrar',
        description: 'Registration, enrollment, transcripts, and academic records',
        estimatedTime: 15,
        isActive: true
      },
      {
        id: 'financial_aid',
        name: 'Financial Aid',
        description: 'Scholarships, loans, grants, and payment assistance',
        estimatedTime: 20,
        isActive: true
      },
      {
        id: 'student_affairs',
        name: 'Student Affairs',
        description: 'Student organizations, activities, and general support',
        estimatedTime: 10,
        isActive: true
      },
      {
        id: 'academic_advising',
        name: 'Academic Advising',
        description: 'Course planning, degree requirements, and academic guidance',
        estimatedTime: 25,
        isActive: true
      },
      {
        id: 'library',
        name: 'Library Services',
        description: 'Book requests, research assistance, and library resources',
        estimatedTime: 10,
        isActive: true
      },
      {
        id: 'it_support',
        name: 'IT Support',
        description: 'Technical assistance, account issues, and system support',
        estimatedTime: 15,
        isActive: true
      }
    ];

    // If you want to get current queue counts for each service
    const servicesWithCounts = await Promise.all(
      services.map(async (service) => {
        try {
          const queueData = await queueService.getQueueByService(service.id);
          return {
            ...service,
            currentQueue: queueData.length,
            currentlyServing: queueData.find(ticket => ticket.status === 'serving') ? 1 : 0,
            estimatedWaitTime: queueData.length * service.estimatedTime
          };
        } catch (error) {
          // If there's an error getting queue data, return service without queue info
          return {
            ...service,
            currentQueue: 0,
            currentlyServing: 0,
            estimatedWaitTime: 0
          };
        }
      })
    );

    res.json({
      success: true,
      data: {
        services: servicesWithCounts
      }
    });

  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to get services' 
    });
  }
}


// Add this method to your QueueController class

// Get detailed queue information for a specific service
async getServiceQueue(req, res) {
  try {
    const { serviceId } = req.params;
    
    // Validate service ID
    const validServices = [
      'registrar', 'financial_aid', 'student_affairs', 
      'academic_advising', 'library', 'it_support'
    ];
    
    if (!validServices.includes(serviceId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid service ID'
      });
    }

    // Get queue data for the specific service
    const queueData = await queueService.getQueueByService(serviceId);
    
    // Get service information
    const serviceInfo = {
      registrar: { name: 'Registrar', estimatedTime: 15 },
      financial_aid: { name: 'Financial Aid', estimatedTime: 20 },
      student_affairs: { name: 'Student Affairs', estimatedTime: 10 },
      academic_advising: { name: 'Academic Advising', estimatedTime: 25 },
      library: { name: 'Library Services', estimatedTime: 10 },
      it_support: { name: 'IT Support', estimatedTime: 15 }
    };

    // Process queue data
    const waitingTickets = queueData.filter(ticket => ticket.status === 'waiting');
    const servingTicket = queueData.find(ticket => ticket.status === 'serving');
    const completedToday = queueData.filter(ticket => 
      ticket.status === 'completed' && 
      new Date(ticket.updatedAt).toDateString() === new Date().toDateString()
    );

    // Calculate statistics
    const totalInQueue = waitingTickets.length;
    const estimatedWaitTime = totalInQueue * serviceInfo[serviceId].estimatedTime;
    const averageServiceTime = completedToday.length > 0 
      ? completedToday.reduce((sum, ticket) => {
          const serviceTime = new Date(ticket.updatedAt) - new Date(ticket.calledAt);
          return sum + (serviceTime / (1000 * 60)); // Convert to minutes
        }, 0) / completedToday.length
      : serviceInfo[serviceId].estimatedTime;

    res.json({
      success: true,
      data: {
        service: {
          id: serviceId,
          name: serviceInfo[serviceId].name,
          isActive: true
        },
        queue: {
          totalWaiting: totalInQueue,
          currentlyServing: servingTicket ? {
            ticketNumber: servingTicket.ticketNumber,
            studentName: servingTicket.studentName,
            calledAt: servingTicket.calledAt
          } : null,
          nextInLine: waitingTickets.length > 0 ? {
            ticketNumber: waitingTickets[0].ticketNumber,
            position: 1,
            estimatedCallTime: new Date(Date.now() + (averageServiceTime * 60 * 1000))
          } : null,
          waitingList: waitingTickets.map((ticket, index) => ({
            ticketNumber: ticket.ticketNumber,
            position: index + 1,
            joinedAt: ticket.createdAt,
            estimatedCallTime: new Date(Date.now() + ((index + 1) * averageServiceTime * 60 * 1000))
          }))
        },
        statistics: {
          estimatedWaitTime: `${Math.round(estimatedWaitTime)} minutes`,
          averageServiceTime: `${Math.round(averageServiceTime)} minutes`,
          servedToday: completedToday.length
        }
      }
    });

  } catch (error) {
    console.error('Get service queue error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to get service queue information' 
    });
  }
}

// Get student's queue status (different from getMyTicket - more detailed)
async getMyQueueStatus(req, res) {
  try {
    const studentId = req.user.id;
    const ticket = await queueService.getActiveTicketByStudent(studentId);
    
    if (!ticket) {
      return res.json({
        success: true,
        data: {
          inQueue: false,
          message: 'You are not currently in any queue'
        }
      });
    }

    // Get current position in queue
    const queueData = await queueService.getQueueByService(ticket.serviceType);
    const waitingTickets = queueData.filter(t => t.status === 'waiting');
    const currentPosition = waitingTickets.findIndex(t => t.id === ticket.id) + 1;
    
    // Get service info for estimated time
    const serviceInfo = {
      registrar: { name: 'Registrar', estimatedTime: 15 },
      financial_aid: { name: 'Financial Aid', estimatedTime: 20 },
      student_affairs: { name: 'Student Affairs', estimatedTime: 10 },
      academic_advising: { name: 'Academic Advising', estimatedTime: 25 },
      library: { name: 'Library Services', estimatedTime: 10 },
      it_support: { name: 'IT Support', estimatedTime: 15 }
    };

    const estimatedWaitTime = currentPosition * (serviceInfo[ticket.serviceType]?.estimatedTime || 15);

    res.json({
      success: true,
      data: {
        inQueue: true,
        ticket: {
          id: ticket.id,
          ticketNumber: ticket.ticketNumber,
          serviceType: ticket.serviceType,
          serviceName: serviceInfo[ticket.serviceType]?.name || ticket.serviceType,
          status: ticket.status,
          position: ticket.status === 'waiting' ? currentPosition : null,
          joinedAt: ticket.createdAt,
          calledAt: ticket.calledAt,
          estimatedWaitTime: ticket.status === 'waiting' ? `${estimatedWaitTime} minutes` : null,
          totalInQueue: waitingTickets.length
        }
      }
    });

  } catch (error) {
    console.error('Get my queue status error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to get queue status' 
    });
  }
}

// Cancel/leave queue (alias for leaveQueue but with different response format)
async cancelQueue(req, res) {
  try {
    const studentId = req.user.id;
    const ticket = await queueService.getActiveTicketByStudent(studentId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'You are not currently in any queue'
      });
    }

    // Don't allow canceling if already being served
    if (ticket.status === 'serving') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel - you are currently being served. Please complete your service or speak with staff.'
      });
    }

    const result = await queueService.leaveQueue(studentId);

    // Emit real-time update
    req.io.emit('queueUpdate', {
      type: 'STUDENT_CANCELLED',
      service: ticket.serviceType,
      ticket: result
    });

    res.json({
      success: true,
      message: 'Successfully cancelled your queue position',
      data: {
        cancelledTicket: {
          ticketNumber: result.ticketNumber,
          serviceType: result.serviceType,
          cancelledAt: new Date()
        }
      }
    });

  } catch (error) {
    console.error('Cancel queue error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to cancel queue position' 
    });
  }
}
}

module.exports = new QueueController();