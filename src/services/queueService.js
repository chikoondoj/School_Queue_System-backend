const {Models} = require("../models");

class QueueService {
  constructor() {
    this.SERVICES = {
      ADMISSION: "admission",
      REGISTRATION: "registration",
      FINANCIAL_AID: "financial_aid",
      COUNSELING: "counseling",
    };

    this.TICKET_STATUS = {
      WAITING: "waiting",
      SERVING: "serving",
      COMPLETED: "completed",
      CANCELLED: "cancelled",
      NO_SHOW: "no_show",
    };

    this.PRIORITY_LEVELS = {
      LOW: 1,
      NORMAL: 2,
      HIGH: 3,
      URGENT: 4,
    };
  }

  async addToQueue(
    studentId,
    serviceType,
    priority = this.PRIORITY_LEVELS.NORMAL,
    notes = null
  ) {
    if (!Object.values(this.SERVICES).includes(serviceType)) {
      throw new Error("Invalid service type");
    }

    const existingTicket = await Models.getActiveTicketByStudent(studentId);
    if (existingTicket) {
      throw new Error("Student already has an active ticket");
    }

    const position = await Models.getNextPosition(serviceType, priority);
    const estimatedWaitTime = await this.calculateDynamicWaitTime(
      serviceType,
      position
    );

    const ticket = await Models.createTicket({
      studentId,
      serviceType,
      position,
      priority,
      notes,
      estimatedWaitTime: estimatedWaitTime.minutes,
      status: this.TICKET_STATUS.WAITING,
    });

    const queueStats = await this.getQueueStats(serviceType);

    return {
      ...ticket,
      estimatedWaitTime,
      queueInfo: {
        position: position,
        totalAhead: position - 1,
        service: serviceType,
        totalWaiting: queueStats.totalWaiting,
        averageWaitTime: queueStats.averageWaitTime,
        currentlyServing: queueStats.currentlyServing,
      },
    };
  }

  async getActiveTicketByStudent(studentId) {
    const ticket = await Models.getActiveTicketByStudent(studentId);

    if (ticket) {
      const currentQueue = await Models.getQueueByService(ticket.service_type);
      const currentPosition =
        currentQueue.findIndex((t) => t.id === ticket.id) + 1;
      const updatedWaitTime = await this.calculateDynamicWaitTime(
        ticket.service_type,
        currentPosition
      );

      const queueMovement = await this.getQueueMovementStats(
        ticket.service_type
      );

      return {
        ...ticket,
        currentPosition: currentPosition,
        totalAhead: currentPosition - 1,
        estimatedWaitTime: updatedWaitTime,
        status: ticket.status,
        queueMovement,
        lastUpdated: new Date().toISOString(),
      };
    }

    return null;
  }

  async getDetailedTicketInfo(ticketId) {
    const ticket = await Models.getTicketById(ticketId);
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const currentQueue = await Models.getQueueByService(ticket.service_type);
    const currentPosition =
      currentQueue.findIndex((t) => t.id === ticket.id) + 1;
    const updatedWaitTime = await this.calculateDynamicWaitTime(
      ticket.service_type,
      currentPosition
    );
    const queueStats = await this.getQueueStats(ticket.service_type);
    const history = await this.getTicketHistory(ticketId);

    return {
      ...ticket,
      currentPosition,
      totalAhead: currentPosition - 1,
      estimatedWaitTime: updatedWaitTime,
      queueStats,
      history,
      lastUpdated: new Date().toISOString(),
    };
  }

  async getQueueByService(serviceType) {
    const queue = await Models.getQueueByService(serviceType);
    const currentStats = await this.getQueueStats(serviceType);

    return {
      serviceType,
      serviceName: this.getServiceDisplayName(serviceType),
      queue: queue.map((ticket, index) => ({
        ...ticket,
        currentPosition: index + 1,
        estimatedWaitTime: this.calculateEstimatedWaitTime(index + 1),
        priority: ticket.priority || this.PRIORITY_LEVELS.NORMAL,
      })),
      stats: currentStats,
      lastUpdated: new Date().toISOString(),
    };
  }

    async getActiveTicketsForService(serviceType) {
    const queue = await Models.getQueueByService(serviceType);
    // Filter tickets that are active (waiting or serving)
    return queue.filter(
      (ticket) =>
        ticket.status === this.TICKET_STATUS.WAITING ||
        ticket.status === this.TICKET_STATUS.SERVING
    );
  }

    async getCompletedTicketsForService(serviceType) {
    const queue = await Models.getQueueByService(serviceType);
    // Filter tickets with status 'completed'
    return queue.filter(
      (ticket) => ticket.status === this.TICKET_STATUS.COMPLETED
    );
  }

  async getServicesDetailed() {
    const services = [];

    for (const serviceType of Object.values(this.SERVICES)) {
      const stats = await this.getQueueStats(serviceType);
      const recentActivity = await this.getRecentActivity(serviceType);

      services.push({
        type: serviceType,
        name: this.getServiceDisplayName(serviceType),
        description: this.getServiceDescription(serviceType),
        stats,
        recentActivity,
        isAvailable: await this.isServiceAvailable(serviceType),
        operatingHours: this.getOperatingHours(serviceType),
      });
    }

    return services;
  }

  async getQueueStats(serviceType) {
    const queue = await Models.getQueueByService(serviceType);
    const currentlyServing = await Models.getCurrentlyServing(serviceType);
    const todayStats = await Models.getTodayServiceStats(serviceType);
    const avgWaitTime = await Models.getAverageWaitTime(serviceType);

    return {
      totalWaiting: queue.length,
      currentlyServing: currentlyServing
        ? {
            studentId: currentlyServing.student_id,
            studentName: currentlyServing.student_name,
            startTime: currentlyServing.service_started_at,
            estimatedCompletion: this.calculateEstimatedCompletion(
              currentlyServing.service_started_at
            ),
          }
        : null,
      averageWaitTime: {
        minutes: avgWaitTime || 15,
        formatted: this.formatMinutes(avgWaitTime || 15),
      },
      todayStats: {
        served: todayStats.total_served || 0,
        avgServiceTime: todayStats.avg_service_time || 15,
        avgWaitTime: todayStats.avg_wait_time || 15,
      },
    };
  }

  async getAdminOverview() {
    const queues = await Models.getAllActiveQueues();
    const systemStats = await Models.getSystemStats();

    const overview = {
      totalStudentsWaiting: 0,
      totalServedToday: systemStats.total_served_today || 0,
      systemHealth: await this.getSystemHealth(),
      servicesOverview: {},
      timestamp: new Date().toISOString(),
    };

    Object.values(this.SERVICES).forEach((service) => {
      overview.servicesOverview[service] = {
        serviceName: this.getServiceDisplayName(service),
        totalWaiting: 0,
        currentlyServing: null,
        nextInLine: null,
        averageWaitTime: this.calculateEstimatedWaitTime(1),
        todayServed: 0,
        status: "available",
      };
    });

    queues.forEach((queue) => {
      overview.totalStudentsWaiting += queue.total_waiting;

      overview.servicesOverview[queue.service_type] = {
        serviceName: this.getServiceDisplayName(queue.service_type),
        totalWaiting: queue.total_waiting,
        currentlyServing: queue.currently_serving_student_id
          ? {
              studentId: queue.currently_serving_student_id,
              studentName: queue.currently_serving_name,
              startTime: queue.service_started_at,
            }
          : null,
        nextInLine: queue.next_student_id
          ? {
              studentId: queue.next_student_id,
              studentName: queue.next_student_name,
              priority: queue.next_priority,
            }
          : null,
        averageWaitTime: this.calculateEstimatedWaitTime(queue.total_waiting),
        todayServed: queue.today_served || 0,
        status: queue.service_status || "available",
      };
    });

    return overview;
  }

  async callNextStudent(serviceType, adminId) {
    const nextTicket = await Models.getNextWaitingTicket(serviceType);

    if (!nextTicket) {
      return null;
    }

    const updatedTicket = await Models.updateTicketStatus(
      nextTicket.id,
      this.TICKET_STATUS.SERVING,
      adminId,
      null,
      { service_started_at: new Date() }
    );

    await this.updateQueuePositions(serviceType);

    return {
      ...updatedTicket,
      calledAt: new Date().toISOString(),
      estimatedServiceTime: await this.getAverageServiceTime(serviceType),
      adminId,
    };
  }

  async markNoShow(ticketId, adminId) {
    const ticket = await Models.getTicketById(ticketId);

    if (!ticket || ticket.status !== this.TICKET_STATUS.SERVING) {
      throw new Error("Invalid ticket or ticket not currently being served");
    }

    const updatedTicket = await Models.updateTicketStatus(
      ticketId,
      this.TICKET_STATUS.NO_SHOW,
      adminId,
      "Student did not show up when called"
    );

    await this.updateQueuePositions(ticket.service_type);

    return {
      ...updatedTicket,
      markedNoShowAt: new Date().toISOString(),
    };
  }

  async completeService(ticketId, adminId, notes = null, rating = null) {
    const ticket = await Models.getTicketById(ticketId);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    if (ticket.status !== this.TICKET_STATUS.SERVING) {
      throw new Error("Ticket is not currently being served");
    }

    const completedTicket = await Models.updateTicketStatus(
      ticketId,
      this.TICKET_STATUS.COMPLETED,
      adminId,
      notes,
      {
        service_completed_at: new Date(),
        service_rating: rating,
      }
    );

    await this.updateServiceStats(ticket.service_type, ticket);

    return {
      ...completedTicket,
      completedAt: new Date().toISOString(),
      actualWaitTime: this.calculateActualWaitTime(completedTicket),
      actualServiceTime: this.calculateActualServiceTime(completedTicket),
    };
  }

  async leaveQueue(studentId, reason = "student_left") {
    const activeTicket = await Models.getActiveTicketByStudent(studentId);

    if (!activeTicket) {
      return null;
    }

    const cancelledTicket = await Models.updateTicketStatus(
      activeTicket.id,
      this.TICKET_STATUS.CANCELLED,
      null,
      reason
    );

    await this.updateQueuePositions(activeTicket.service_type);

    return {
      ...cancelledTicket,
      cancelledAt: new Date().toISOString(),
      reason,
    };
  }

  async getQueueHistory(filters = {}) {
    const history = await Models.getQueueHistory(filters);

    return history.map((ticket) => ({
      ...ticket,
      serviceName: this.getServiceDisplayName(ticket.service_type),
      waitTime: this.calculateActualWaitTime(ticket),
      serviceTime: this.calculateActualServiceTime(ticket),
      priorityLevel: this.getPriorityName(ticket.priority),
    }));
  }

  async getQueueAnalytics(serviceType, startDate, endDate) {
    const analytics = await Models.getQueueAnalytics(
      serviceType,
      startDate,
      endDate
    );
    const trends = await Models.getQueueTrends(serviceType, startDate, endDate);

    return {
      serviceType,
      serviceName: this.getServiceDisplayName(serviceType),
      period: { startDate, endDate },
      analytics: {
        ...analytics,
        avgWaitTimeFormatted: this.formatMinutes(
          analytics.avg_wait_time_minutes
        ),
        avgServiceTimeFormatted: this.formatMinutes(
          analytics.avg_service_time_minutes
        ),
        busiest_hour: analytics.busiest_hour,
        peak_day: analytics.peak_day,
      },
      trends,
      recommendations: this.generateRecommendations(analytics, trends),
    };
  }

  async getSystemHealth() {
    const activeConnections = await Models.getActiveConnections();
    const queueBacklog = await Models.getTotalQueueBacklog();
    const avgResponseTime = await Models.getAverageResponseTime();

    return {
      status: this.determineSystemStatus(
        activeConnections,
        queueBacklog,
        avgResponseTime
      ),
      activeConnections,
      queueBacklog,
      avgResponseTime,
      lastChecked: new Date().toISOString(),
    };
  }

  async calculateDynamicWaitTime(serviceType, position) {
    const recentServiceTimes = await Models.getRecentServiceTimes(
      serviceType,
      10
    );
    const currentlyServing = await Models.getCurrentlyServing(serviceType);
    const timeOfDay = new Date().getHours();

    let avgServiceTime = 15;
    if (recentServiceTimes.length > 0) {
      avgServiceTime =
        recentServiceTimes.reduce((sum, time) => sum + time, 0) /
        recentServiceTimes.length;
    }

    const timeMultiplier = this.getTimeMultiplier(timeOfDay);
    const adjustedServiceTime = avgServiceTime * timeMultiplier;

    let estimatedMinutes = (position - 1) * adjustedServiceTime;

    if (currentlyServing) {
      const serviceStartTime = new Date(currentlyServing.service_started_at);
      const elapsedMinutes = (new Date() - serviceStartTime) / (1000 * 60);
      const remainingServiceTime = Math.max(0, avgServiceTime - elapsedMinutes);
      estimatedMinutes += remainingServiceTime;
    }

    return {
      minutes: Math.round(estimatedMinutes),
      formatted: this.formatMinutes(estimatedMinutes),
      hours: Math.floor(estimatedMinutes / 60),
      remainingMinutes: Math.round(estimatedMinutes % 60),
      confidence: this.calculateConfidence(recentServiceTimes.length, position),
    };
  }

  async updateQueuePositions(serviceType) {
    const queue = await Models.getQueueByService(serviceType);

    for (let i = 0; i < queue.length; i++) {
      if (queue[i].position !== i + 1) {
        await Models.updateTicketPosition(queue[i].id, i + 1);
      }
    }
  }

  async getQueueMovementStats(serviceType) {
    const last30Min = await Models.getQueueMovementInPeriod(serviceType, 30);
    const lastHour = await Models.getQueueMovementInPeriod(serviceType, 60);

    return {
      studentsServedLast30Min: last30Min,
      studentsServedLastHour: lastHour,
      averageMovementRate: lastHour > 0 ? 60 / lastHour : null,
    };
  }

  async getRecentActivity(serviceType, limit = 5) {
    return await Models.getRecentActivity(serviceType, limit);
  }

  async getTicketHistory(ticketId) {
    return await Models.getTicketStatusHistory(ticketId);
  }

  async isServiceAvailable(serviceType) {
    const operatingHours = this.getOperatingHours(serviceType);
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay();

    if (
      operatingHours.days.includes(currentDay) &&
      currentHour >= operatingHours.start &&
      currentHour < operatingHours.end
    ) {
      return true;
    }

    return false;
  }

  getOperatingHours(serviceType) {
    const defaultHours = {
      days: [1, 2, 3, 4, 5],
      start: 8,
      end: 17,
      timezone: "UTC",
    };

    const serviceHours = {
      [this.SERVICES.ADMISSION]: { ...defaultHours, end: 16 },
      [this.SERVICES.REGISTRATION]: defaultHours,
      [this.SERVICES.FINANCIAL_AID]: { ...defaultHours, start: 9, end: 16 },
      [this.SERVICES.COUNSELING]: { ...defaultHours, days: [1, 2, 3, 4, 5, 6] },
    };

    return serviceHours[serviceType] || defaultHours;
  }

  calculateEstimatedWaitTime(position) {
    const averageServiceTime = 15;
    const estimatedMinutes = (position - 1) * averageServiceTime;

    return {
      minutes: estimatedMinutes,
      formatted: this.formatMinutes(estimatedMinutes),
      hours: Math.floor(estimatedMinutes / 60),
      remainingMinutes: estimatedMinutes % 60,
    };
  }

  calculateEstimatedCompletion(startTime) {
    const avgServiceTime = 15;
    const start = new Date(startTime);
    const completion = new Date(start.getTime() + avgServiceTime * 60000);

    return {
      timestamp: completion.toISOString(),
      inMinutes: Math.max(
        0,
        Math.round((completion - new Date()) / (1000 * 60))
      ),
    };
  }

  calculateActualWaitTime(ticket) {
    if (!ticket.service_started_at) return null;

    const waitStart = new Date(ticket.created_at);
    const waitEnd = new Date(ticket.service_started_at);
    const waitMinutes = (waitEnd - waitStart) / (1000 * 60);

    return {
      minutes: Math.round(waitMinutes),
      formatted: this.formatMinutes(waitMinutes),
    };
  }

  calculateActualServiceTime(ticket) {
    if (!ticket.service_started_at || !ticket.service_completed_at) return null;

    const serviceStart = new Date(ticket.service_started_at);
    const serviceEnd = new Date(ticket.service_completed_at);
    const serviceMinutes = (serviceEnd - serviceStart) / (1000 * 60);

    return {
      minutes: Math.round(serviceMinutes),
      formatted: this.formatMinutes(serviceMinutes),
    };
  }

  getTimeMultiplier(hour) {
    if (hour >= 8 && hour <= 10) return 1.2;
    if (hour >= 11 && hour <= 14) return 1.5;
    if (hour >= 15 && hour <= 17) return 1.1;
    return 1.0;
  }

  calculateConfidence(dataPoints, position) {
    if (dataPoints < 3) return "low";
    if (dataPoints >= 3 && dataPoints < 8) return "medium";
    if (position <= 5) return "high";
    return "medium";
  }

  async getAverageServiceTime(serviceType) {
    const recentTimes = await Models.getRecentServiceTimes(serviceType, 20);
    if (recentTimes.length === 0) return 15;

    return Math.round(
      recentTimes.reduce((sum, time) => sum + time, 0) / recentTimes.length
    );
  }

  async updateServiceStats(serviceType, ticket) {
    const waitTime = this.calculateActualWaitTime(ticket);
    const serviceTime = this.calculateActualServiceTime(ticket);

    if (waitTime && serviceTime) {
      await Models.updateServiceAverages(
        serviceType,
        waitTime.minutes,
        serviceTime.minutes
      );
    }
  }

  determineSystemStatus(connections, backlog, responseTime) {
    if (backlog > 100 || responseTime > 5000) return "degraded";
    if (backlog > 50 || responseTime > 2000) return "warning";
    return "healthy";
  }

  generateRecommendations(analytics, trends) {
    const recommendations = [];

    if (analytics.avg_wait_time_minutes > 30) {
      recommendations.push(
        "Consider adding more service staff during peak hours"
      );
    }

    if (trends.increasing_trend) {
      recommendations.push(
        "Queue demand is increasing - review staffing levels"
      );
    }

    if (analytics.no_show_rate > 0.15) {
      recommendations.push(
        "High no-show rate detected - consider implementing confirmation system"
      );
    }

    return recommendations;
  }

  getPriorityName(priority) {
    const names = {
      [this.PRIORITY_LEVELS.LOW]: "Low",
      [this.PRIORITY_LEVELS.NORMAL]: "Normal",
      [this.PRIORITY_LEVELS.HIGH]: "High",
      [this.PRIORITY_LEVELS.URGENT]: "Urgent",
    };

    return names[priority] || "Normal";
  }

  formatMinutes(minutes) {
    if (minutes < 1) return "Less than 1 minute";
    if (minutes < 60) return `${Math.round(minutes)} minutes`;

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);

    if (remainingMinutes === 0) return `${hours} hour${hours > 1 ? "s" : ""}`;
    return `${hours} hour${hours > 1 ? "s" : ""} ${remainingMinutes} minute${
      remainingMinutes > 1 ? "s" : ""
    }`;
  }

  getServiceDisplayName(serviceType) {
    const names = {
      [this.SERVICES.ADMISSION]: "Student Admission",
      [this.SERVICES.REGISTRATION]: "Student Registration",
      [this.SERVICES.FINANCIAL_AID]: "Financial Aid",
      [this.SERVICES.COUNSELING]: "Counseling Services",
    };

    return names[serviceType] || serviceType;
  }

  getServiceDescription(serviceType) {
    const descriptions = {
      [this.SERVICES.ADMISSION]:
        "New student admissions and application processing",
      [this.SERVICES.REGISTRATION]: "Course registration and academic records",
      [this.SERVICES.FINANCIAL_AID]:
        "Financial assistance and scholarship inquiries",
      [this.SERVICES.COUNSELING]: "Academic and personal counseling services",
    };

    return descriptions[serviceType] || "General service";
  }

  async getAllServices() {
  // Fetch all services from the database
  const servicesFromDb = await prisma.service.findMany({
    select: { id: true, name: true, description: true, estimatedTime: true, isActive: true },
  });

  
  const services = [];

  for (const service of servicesFromDb) {
    const serviceTypeEntry = Object.entries(this.SERVICES).find(
      ([key, value]) => service.name.toLowerCase().includes(value.toLowerCase())
    );

    const type = serviceTypeEntry ? serviceTypeEntry[0] : service.name.toLowerCase();

    const stats = await this.getQueueStats(service.id);
    const isAvailable = await this.isServiceAvailable(service.id);

    services.push({
      id: service.id,          
      type,
      name: service.name,
      description: service.description,
      stats,
      isAvailable,
      operatingHours: this.getOperatingHours(type),
      lastUpdated: new Date().toISOString(),
    });
  }

  return services;
}



  async getQueueUpdates(serviceType) {
    const queue = await this.getQueueByService(serviceType);
    const overview = await this.getAdminOverview();

    return {
      serviceType,
      queue: queue.queue,
      overview: overview.servicesOverview[serviceType],
      systemHealth: overview.systemHealth,
      timestamp: new Date().toISOString(),
    };
  }

  isValidServiceType(serviceType) {
    return Object.values(this.SERVICES).includes(serviceType);
  }

  getAvailableServices() {
    return Object.values(this.SERVICES).map((service) => ({
      type: service,
      name: this.getServiceDisplayName(service),
      description: this.getServiceDescription(service),
      operatingHours: this.getOperatingHours(service),
      isAvailable: this.isServiceAvailable(service),
    }));
  }

  async getAllServices() {
    return this.getAvailableServices();
  }
}

module.exports = new QueueService();
