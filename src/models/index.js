const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Models {
  static async createUser(userData) {
    const {
      studentCode,
      password,
      name,
      course,
      year,
      role = "STUDENT",
    } = userData;

    const result = await prisma.user.create({
      data: {
        studentCode,
        password,
        name,
        course,
        year,
        role: role.toUpperCase(),
      },
    });

    return result;
  }

  static async getUserByStudentCode(studentCode) {
    return await prisma.user.findUnique({
      where: { studentCode },
    });
  }

  static async getUserById(id) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  static async updateUser(id, updates) {
    return await prisma.user.update({
      where: { id },
      data: {
        ...updates,
        updatedAt: new Date(),
      },
    });
  }

  static async createService(serviceData) {
    const { name, description } = serviceData;

    return await prisma.service.create({
      data: {
        name,
        description,
      },
    });
  }

  static async getServiceById(id) {
    return await prisma.service.findUnique({
      where: { id },
    });
  }

  static async getServiceByName(name) {
    return await prisma.service.findUnique({
      where: { name },
    });
  }

  static async getAllServices() {
    return await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  }

  static async getServicesDetailed() {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });

    const detailedServices = await Promise.all(
      services.map(async (service) => {
        const waitingCount = await prisma.tickets.count({
          where: {
            serviceId: service.id,
            status: "WAITING",
          },
        });

        const inProgressTicket = await prisma.tickets.findFirst({
          where: {
            serviceId: service.id,
            status: "IN_PROGRESS",
          },
          include: {
            user: {
              select: {
                name: true,
                studentCode: true,
              },
            },
          },
        });

        const avgWaitTime = await this.getAverageWaitTime(service.id);
        const estimatedWaitTime = waitingCount * avgWaitTime;

        return {
          ...service,
          queueLength: waitingCount,
          currentlyServing: inProgressTicket
            ? {
                ticketId: inProgressTicket.id,
                userName: inProgressTicket.user.name,
                userCode: inProgressTicket.user.studentCode,
              }
            : null,
          averageWaitTime: Math.round(avgWaitTime),
          estimatedWaitTime: Math.round(estimatedWaitTime),
          isActive: waitingCount > 0 || inProgressTicket !== null,
        };
      })
    );

    return detailedServices;
  }

  static async createTicket(ticketData) {
    const { userId, serviceId, position } = ticketData;

    const result = await prisma.tickets.create({
      data: {
        userId,
        serviceId,
        position,
        status: "WAITING",
      },
      include: {
        user: {
          select: {
            name: true,
            studentCode: true,
            course: true,
            year: true,
          },
        },
        service: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });

    return result;
  }

  static async getTicketById(id) {
    return await prisma.tickets.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            studentCode: true,
            course: true,
            year: true,
          },
        },
        service: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });
  }

  static async getTicketDetailed(id) {
    const ticket = await prisma.tickets.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            studentCode: true,
            course: true,
            year: true,
          },
        },
        service: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    });

    if (!ticket) return null;

    const queuePosition = await this.getTicketPosition(id);
    const estimatedWaitTime = await this.getEstimatedWaitTime(
      ticket.serviceId,
      queuePosition
    );
    const queueLength = await prisma.tickets.count({
      where: {
        serviceId: ticket.serviceId,
        status: {
          in: ["WAITING", "CALLED", "IN_PROGRESS"],
        },
      },
    });

    return {
      ...ticket,
      queuePosition,
      estimatedWaitTime: Math.round(estimatedWaitTime),
      totalInQueue: queueLength,
    };
  }

  static async getActiveTicketByUser(userId) {
    return await prisma.tickets.findFirst({
      where: {
        userId,
        status: {
          in: ["WAITING", "CALLED", "IN_PROGRESS"],
        },
      },
      include: {
        user: {
          select: {
            name: true,
            studentCode: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async getTicketPosition(ticketId) {
    const ticket = await prisma.tickets.findUnique({
      where: { id: ticketId },
      select: { serviceId: true, position: true, status: true },
    });

    if (!ticket) return null;

    if (ticket.status === "IN_PROGRESS") return 0;
    if (ticket.status === "CALLED") return 1;

    const aheadCount = await prisma.tickets.count({
      where: {
        serviceId: ticket.serviceId,
        position: { lt: ticket.position },
        status: {
          in: ["WAITING", "CALLED"],
        },
      },
    });

    return aheadCount + 1;
  }

  static async getQueueByService(serviceId) {
    return await prisma.tickets.findMany({
      where: {
        serviceId,
        status: {
          in: ["WAITING", "CALLED", "IN_PROGRESS"],
        },
      },
      include: {
        user: {
          select: {
            name: true,
            studentCode: true,
            course: true,
            year: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        position: "asc",
      },
    });
  }

  static async getNextWaitingTicket(serviceId) {
    return await prisma.tickets.findFirst({
      where: {
        serviceId,
        status: "WAITING",
      },
      include: {
        user: {
          select: {
            name: true,
            studentCode: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        position: "asc",
      },
    });
  }

  static async updateTicketStatus(
    id,
    status,
    calledAt = null,
    completedAt = null
  ) {
    const updateData = {
      status: status.toUpperCase(),
      // updatedAt: new Date(),
    };

    if (status.toUpperCase() === "CALLED" && calledAt) {
      updateData.calledAt = calledAt;
    }

    if (status.toUpperCase() === "COMPLETED" && completedAt) {
      updateData.completedAt = completedAt;
    }

    return await prisma.tickets.update({
      where: { id },
      data: updateData,
    });
  }

  static async getNextPosition(serviceId) {
    const lastTicket = await prisma.tickets.findFirst({
      where: {
        serviceId,
        status: {
          in: ["WAITING", "CALLED", "IN_PROGRESS"],
        },
      },
      orderBy: {
        position: "desc",
      },
    });

    return (lastTicket?.position || 0) + 1;
  }

  static async getAllActiveQueues() {
    const queues = await prisma.tickets.groupBy({
      by: ["serviceId"],
      where: {
        status: {
          in: ["WAITING", "CALLED", "IN_PROGRESS"],
        },
      },
      _count: {
        _all: true,
      },
    });

    const enrichedQueues = await Promise.all(
      queues.map(async (queue) => {
        const service = await prisma.service.findUnique({
          where: { id: queue.serviceId },
        });

        const currentlyServing = await prisma.tickets.findFirst({
          where: {
            serviceId: queue.serviceId,
            status: "IN_PROGRESS",
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        });

        const nextWaiting = await this.getNextWaitingTicket(queue.serviceId);

        return {
          service_id: queue.serviceId,
          service_name: service?.name || "Unknown Service",
          total_waiting: queue._count._all,
          currently_serving_user_id: currentlyServing?.user?.id || null,
          currently_serving_name: currentlyServing?.user?.name || null,
          next_user_id: nextWaiting?.user?.id || null,
          next_user_name: nextWaiting?.user?.name || null,
        };
      })
    );

    return enrichedQueues;
  }

  static async getQueueHistory(filters = {}) {
    const where = {};

    if (filters.startDate) {
      where.createdAt = {
        ...where.createdAt,
        gte: new Date(filters.startDate),
      };
    }

    if (filters.endDate) {
      where.createdAt = { ...where.createdAt, lte: new Date(filters.endDate) };
    }

    if (filters.serviceId) {
      where.serviceId = filters.serviceId;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.userId) {
      where.userId = filters.userId;
    }

    const tickets = await prisma.tickets.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            studentCode: true,
            course: true,
          },
        },
        service: {
          select: {
            name: true,
            description: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return tickets.map((ticket) => ({
      ...ticket,
      waitTime: ticket.calledAt
        ? Math.round(
            (new Date(ticket.calledAt) - new Date(ticket.createdAt)) /
              (1000 * 60)
          )
        : null,
      serviceTime:
        ticket.completedAt && ticket.calledAt
          ? Math.round(
              (new Date(ticket.completedAt) - new Date(ticket.calledAt)) /
                (1000 * 60)
            )
          : null,
    }));
  }

  static async getQueueStatistics(filters = {}) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const where = {
      createdAt: {
        gte: filters.startDate ? new Date(filters.startDate) : thirtyDaysAgo,
      },
    };

    if (filters.endDate) {
      where.createdAt.lte = new Date(filters.endDate);
    }

    if (filters.serviceId) {
      where.serviceId = filters.serviceId;
    }

    const totalTickets = await prisma.tickets.count({ where });
    const completedTickets = await prisma.tickets.count({
      where: { ...where, status: "COMPLETED" },
    });
    const cancelledTickets = await prisma.tickets.count({
      where: { ...where, status: "CANCELLED" },
    });

    const completedWithTimes = await prisma.tickets.findMany({
      where: {
        ...where,
        status: "COMPLETED",
        calledAt: { not: null },
        completedAt: { not: null },
      },
    });

    const waitTimes = completedWithTimes
      .map((t) => (new Date(t.calledAt) - new Date(t.createdAt)) / (1000 * 60))
      .filter((time) => time >= 0);

    const serviceTimes = completedWithTimes
      .map(
        (t) => (new Date(t.completedAt) - new Date(t.calledAt)) / (1000 * 60)
      )
      .filter((time) => time >= 0);

    const avgWaitTime =
      waitTimes.length > 0
        ? waitTimes.reduce((a, b) => a + b, 0) / waitTimes.length
        : 0;

    const avgServiceTime =
      serviceTimes.length > 0
        ? serviceTimes.reduce((a, b) => a + b, 0) / serviceTimes.length
        : 0;

    const peakHours = await this.getPeakHours(where);
    const serviceBreakdown = await this.getServiceBreakdown(where);

    return {
      totalTickets,
      completedTickets,
      cancelledTickets,
      averageWaitTime: Math.round(avgWaitTime),
      averageServiceTime: Math.round(avgServiceTime),
      completionRate:
        totalTickets > 0
          ? Math.round((completedTickets / totalTickets) * 100)
          : 0,
      peakHours,
      serviceBreakdown,
    };
  }

  static async getPeakHours(whereClause) {
    const tickets = await prisma.tickets.findMany({
      where: whereClause,
      select: { createdAt: true },
    });

    const hourCounts = {};
    tickets.forEach((ticket) => {
      const hour = new Date(ticket.createdAt).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    return Object.entries(hourCounts)
      .map(([hour, count]) => ({ hour: parseInt(hour), count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  static async getServiceBreakdown(whereClause) {
    const breakdown = await prisma.tickets.groupBy({
      by: ["serviceId"],
      where: whereClause,
      _count: { _all: true },
    });

    const enriched = await Promise.all(
      breakdown.map(async (item) => {
        const service = await prisma.service.findUnique({
          where: { id: item.serviceId },
          select: { name: true },
        });
        return {
          serviceName: service?.name || "Unknown",
          count: item._count._all,
        };
      })
    );

    return enriched.sort((a, b) => b.count - a.count);
  }

  static async getAverageWaitTime(serviceId, days = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const completedTickets = await prisma.tickets.findMany({
      where: {
        serviceId,
        status: "COMPLETED",
        calledAt: { not: null },
        createdAt: { gte: startDate },
      },
    });

    if (completedTickets.length === 0) return 5;

    const waitTimes = completedTickets
      .map((t) => (new Date(t.calledAt) - new Date(t.createdAt)) / (1000 * 60))
      .filter((time) => time >= 0);

    return waitTimes.length > 0
      ? waitTimes.reduce((a, b) => a + b, 0) / waitTimes.length
      : 5;
  }

  static async getEstimatedWaitTime(serviceId, position) {
    const avgServiceTime = await this.getAverageServiceTime(serviceId);
    return position * avgServiceTime;
  }

  static async getAverageServiceTime(serviceId, days = 7) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const completedTickets = await prisma.tickets.findMany({
      where: {
        serviceId,
        status: "COMPLETED",
        calledAt: { not: null },
        completedAt: { not: null },
        createdAt: { gte: startDate },
      },
    });

    if (completedTickets.length === 0) return 5;

    const serviceTimes = completedTickets
      .map(
        (t) => (new Date(t.completedAt) - new Date(t.calledAt)) / (1000 * 60)
      )
      .filter((time) => time >= 0);

    return serviceTimes.length > 0
      ? serviceTimes.reduce((a, b) => a + b, 0) / serviceTimes.length
      : 5;
  }

  static async deleteTicket(id) {
    return await prisma.tickets.delete({
      where: { id },
    });
  }

  static async cancelTicket(id) {
    return await prisma.tickets.update({
      where: { id },
      data: {
        status: "CANCELLED",
        updatedAt: new Date(),
      },
    });
  }

  static async getServiceStats(serviceId, startDate, endDate) {
    const tickets = await prisma.tickets.findMany({
      where: {
        serviceId,
        status: "COMPLETED",
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        calledAt: { not: null },
        completedAt: { not: null },
      },
    });

    if (tickets.length === 0) {
      return {
        total_served: 0,
        avg_service_time_minutes: 0,
        avg_wait_time_minutes: 0,
      };
    }

    const serviceTimes = tickets
      .map((ticket) => {
        const serviceTime =
          (new Date(ticket.completedAt) - new Date(ticket.calledAt)) /
          (1000 * 60);
        return serviceTime;
      })
      .filter((time) => time > 0);

    const waitTimes = tickets
      .map((ticket) => {
        const waitTime =
          (new Date(ticket.calledAt) - new Date(ticket.createdAt)) /
          (1000 * 60);
        return waitTime;
      })
      .filter((time) => time > 0);

    const avgServiceTime =
      serviceTimes.length > 0
        ? serviceTimes.reduce((a, b) => a + b, 0) / serviceTimes.length
        : 0;

    const avgWaitTime =
      waitTimes.length > 0
        ? waitTimes.reduce((a, b) => a + b, 0) / waitTimes.length
        : 0;

    return {
      total_served: tickets.length,
      avg_service_time_minutes: avgServiceTime,
      avg_wait_time_minutes: avgWaitTime,
    };
  }

  static async getSystemHealth() {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

    const activeTickets = await prisma.tickets.count({
      where: {
        status: { in: ["WAITING", "CALLED", "IN_PROGRESS"] },
      },
    });

    const recentActivity = await prisma.tickets.count({
      where: {
        createdAt: { gte: oneHourAgo },
      },
    });

    const activeServices = await prisma.service.count({
      where: { isActive: true },
    });

    const stuckTickets = await prisma.tickets.count({
      where: {
        status: "CALLED",
        calledAt: { lt: new Date(now.getTime() - 15 * 60 * 1000) },
      },
    });

    return {
      status: stuckTickets > 5 ? "warning" : "healthy",
      activeTickets,
      recentActivity,
      activeServices,
      stuckTickets,
      timestamp: now,
    };
  }
    static async getAllTickets(filters = {}) {
    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.serviceId) where.serviceId = filters.serviceId;
    if (filters.userId) where.userId = filters.userId;

    return await prisma.tickets.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            studentCode: true,
            course: true,
            year: true,
          },
        },
        service: {
          select: {
            name: true,
            description: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  /**
   * Get only currently active tickets (WAITING, CALLED, IN_PROGRESS)
   * @param {Object} filters { serviceId, userId }
   * @returns {Promise<Array>}
   */
  static async getAllActiveTickets(filters = {}) {
    const where = {
      status: {
        in: ["WAITING", "CALLED", "IN_PROGRESS"],
      },
    };
    if (filters.serviceId) where.serviceId = filters.serviceId;
    if (filters.userId) where.userId = filters.userId;

    return await prisma.tickets.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            studentCode: true,
            course: true,
            year: true,
          },
        },
        service: {
          select: {
            name: true,
            description: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}


module.exports = { Models, prisma };
