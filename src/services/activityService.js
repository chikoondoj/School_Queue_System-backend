// src/services/activityService.js
const { PrismaClient } = require('@prisma/client');
const ActivityLog = require('../models/activityLog');
const { Op } = require('sequelize');

const prisma = new PrismaClient();

class ActivityService {
  // ===============================
  // GENERAL ACTIVITY MANAGEMENT
  // ===============================

  /**
   * Get activities with advanced filtering and pagination
   */
  async getActivities(filters = {}) {
    const {
      page = 1,
      limit = 10,
      type,
      status,
      userId,
      startDate,
      endDate,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = filters;

    const skip = (page - 1) * limit;
    const where = {};

    // Apply filters
    if (type) where.type = type;
    if (status) where.status = status;
    if (userId) where.userId = userId;
    
    // Date range filtering
    if (startDate || endDate) {
      where.startDate = {};
      if (startDate) where.startDate.gte = new Date(startDate);
      if (endDate) where.startDate.lte = new Date(endDate);
    }

    // Search functionality
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    try {
      const [activities, total] = await Promise.all([
        prisma.activity.findMany({
          where,
          skip: parseInt(skip),
          take: parseInt(limit),
          orderBy: { [sortBy]: sortOrder },
          include: {
            user: {
              select: { id: true, name: true, email: true, firstName: true, lastName: true }
            }
          }
        }),
        prisma.activity.count({ where })
      ]);

      return {
        success: true,
        activities,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1
        }
      };
    } catch (error) {
      console.error('Error fetching activities:', error);
      return {
        success: false,
        error: 'Failed to fetch activities',
        activities: [],
        pagination: null
      };
    }
  }

  /**
   * Create a new activity with comprehensive validation
   */
  async createActivity(activityData) {
    const {
      title,
      description,
      type,
      status = 'active',
      startDate,
      endDate,
      userId,
      metadata = {},
      priority = 'medium'
    } = activityData;

    // Enhanced validation
    if (!title || title.trim().length === 0) {
      throw new Error('Title is required and cannot be empty');
    }

    if (!type) {
      throw new Error('Activity type is required');
    }

    // Validate dates
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start > end) {
        throw new Error('Start date cannot be after end date');
      }
      
      if (start < new Date() && status === 'scheduled') {
        throw new Error('Cannot schedule activity with past start date');
      }
    }

    // Validate status
    const validStatuses = ['active', 'inactive', 'completed', 'cancelled', 'scheduled', 'in_progress'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    const data = {
      title: title.trim(),
      description: description?.trim() || null,
      type,
      status,
      priority,
      metadata: JSON.stringify(metadata)
    };

    if (startDate) data.startDate = new Date(startDate);
    if (endDate) data.endDate = new Date(endDate);
    if (userId) data.userId = userId;

    try {
      const activity = await prisma.activity.create({
        data,
        include: {
          user: {
            select: { id: true, name: true, email: true, firstName: true, lastName: true }
          }
        }
      });

      return {
        success: true,
        activity
      };
    } catch (error) {
      console.error('Error creating activity:', error);
      throw new Error('Failed to create activity');
    }
  }

  /**
   * Update activity with validation
   */
  async updateActivity(id, updateData) {
    const { title, description, type, status, startDate, endDate, metadata, priority } = updateData;

    // Validate the activity exists
    const existingActivity = await prisma.activity.findUnique({ where: { id } });
    if (!existingActivity) {
      throw new Error('Activity not found');
    }

    const data = { updatedAt: new Date() };

    if (title !== undefined) data.title = title.trim();
    if (description !== undefined) data.description = description?.trim() || null;
    if (type !== undefined) data.type = type;
    if (status !== undefined) data.status = status;
    if (priority !== undefined) data.priority = priority;
    if (startDate !== undefined) data.startDate = startDate ? new Date(startDate) : null;
    if (endDate !== undefined) data.endDate = endDate ? new Date(endDate) : null;
    if (metadata !== undefined) data.metadata = JSON.stringify(metadata);

    // Validate dates if both are provided
    if (data.startDate && data.endDate && data.startDate > data.endDate) {
      throw new Error('Start date cannot be after end date');
    }

    try {
      const activity = await prisma.activity.update({
        where: { id },
        data,
        include: {
          user: {
            select: { id: true, name: true, email: true, firstName: true, lastName: true }
          }
        }
      });

      return {
        success: true,
        activity
      };
    } catch (error) {
      console.error('Error updating activity:', error);
      throw new Error('Failed to update activity');
    }
  }

  /**
   * Update activity status only
   */
  async updateActivityStatus(id, status) {
    const validStatuses = ['active', 'inactive', 'completed', 'cancelled', 'scheduled', 'in_progress'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    try {
      const activity = await prisma.activity.update({
        where: { id },
        data: { status, updatedAt: new Date() }
      });

      return {
        success: true,
        activity
      };
    } catch (error) {
      console.error('Error updating activity status:', error);
      throw new Error('Failed to update activity status');
    }
  }

  /**
   * Delete activity
   */
  async deleteActivity(id) {
    try {
      await prisma.activity.delete({
        where: { id }
      });

      return {
        success: true,
        message: 'Activity deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting activity:', error);
      throw new Error('Failed to delete activity');
    }
  }

  /**
   * Get activities due soon
   */
  async getActivitiesDueSoon(days = 7, userId = null) {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);

    const where = {
      endDate: {
        lte: futureDate,
        gte: new Date()
      },
      status: { in: ['active', 'scheduled', 'in_progress'] }
    };

    if (userId) where.userId = userId;

    try {
      const activities = await prisma.activity.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true, firstName: true, lastName: true }
          }
        },
        orderBy: { endDate: 'asc' }
      });

      return {
        success: true,
        activities,
        daysAhead: days
      };
    } catch (error) {
      console.error('Error fetching due activities:', error);
      return {
        success: false,
        error: 'Failed to fetch due activities',
        activities: []
      };
    }
  }

  /**
   * Get comprehensive activity analytics
   */
  async getActivityAnalytics(userId = null, dateRange = null) {
    const where = userId ? { userId } : {};

    // Add date range filter if provided
    if (dateRange && dateRange.startDate && dateRange.endDate) {
      where.createdAt = {
        gte: new Date(dateRange.startDate),
        lte: new Date(dateRange.endDate)
      };
    }

    try {
      const [
        total,
        statusCounts,
        typeCounts,
        priorityCounts,
        recentActivities,
        completionRate
      ] = await Promise.all([
        prisma.activity.count({ where }),
        prisma.activity.groupBy({
          by: ['status'],
          where,
          _count: { status: true }
        }),
        prisma.activity.groupBy({
          by: ['type'],
          where,
          _count: { type: true }
        }),
        prisma.activity.groupBy({
          by: ['priority'],
          where,
          _count: { priority: true }
        }),
        prisma.activity.findMany({
          where,
          take: 10,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            type: true,
            status: true,
            priority: true,
            createdAt: true,
            endDate: true
          }
        }),
        this.getCompletionRate(where)
      ]);

      return {
        success: true,
        analytics: {
          total,
          statusDistribution: statusCounts.reduce((acc, item) => {
            acc[item.status] = item._count.status;
            return acc;
          }, {}),
          typeDistribution: typeCounts.reduce((acc, item) => {
            acc[item.type] = item._count.type;
            return acc;
          }, {}),
          priorityDistribution: priorityCounts.reduce((acc, item) => {
            acc[item.priority] = item._count.priority;
            return acc;
          }, {}),
          completionRate,
          recentActivities
        }
      };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return {
        success: false,
        error: 'Failed to fetch analytics'
      };
    }
  }

  /**
   * Calculate completion rate
   */
  async getCompletionRate(where = {}) {
    try {
      const [total, completed] = await Promise.all([
        prisma.activity.count({ where }),
        prisma.activity.count({
          where: { ...where, status: 'completed' }
        })
      ]);

      return total > 0 ? Math.round((completed / total) * 100) : 0;
    } catch (error) {
      console.error('Error calculating completion rate:', error);
      return 0;
    }
  }

  /**
   * Bulk update activities
   */
  async bulkUpdateActivities(ids, updateData) {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('Activity IDs array is required');
    }

    const data = { updatedAt: new Date(), ...updateData };

    try {
      const result = await prisma.activity.updateMany({
        where: {
          id: { in: ids }
        },
        data
      });

      return {
        success: true,
        updatedCount: result.count
      };
    } catch (error) {
      console.error('Error bulk updating activities:', error);
      throw new Error('Failed to bulk update activities');
    }
  }

  /**
   * Advanced search with full-text capabilities
   */
  async searchActivities(query, filters = {}) {
    if (!query || query.trim().length === 0) {
      return this.getActivities(filters);
    }

    const where = {
      OR: [
        { title: { contains: query.trim(), mode: 'insensitive' } },
        { description: { contains: query.trim(), mode: 'insensitive' } }
      ]
    };

    // Apply additional filters
    if (filters.type) where.type = filters.type;
    if (filters.status) where.status = filters.status;
    if (filters.userId) where.userId = filters.userId;
    if (filters.priority) where.priority = filters.priority;

    try {
      const activities = await prisma.activity.findMany({
        where,
        include: {
          user: {
            select: { id: true, name: true, email: true, firstName: true, lastName: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: filters.limit || 50
      });

      return {
        success: true,
        activities,
        query,
        resultCount: activities.length
      };
    } catch (error) {
      console.error('Error searching activities:', error);
      return {
        success: false,
        error: 'Failed to search activities',
        activities: []
      };
    }
  }

  // ===============================
  // ACTIVITY LOGGING SYSTEM
  // ===============================

  /**
   * Generic activity logging method
   */
  static async logActivity(data) {
    try {
      const activity = await ActivityLog.create({
        userId: data.userId || null,
        ticketId: data.ticketId || null,
        serviceId: data.serviceId || null,
        action: data.action,
        details: data.details ? JSON.stringify(data.details) : null,
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent || null,
        timestamp: new Date()
      });
      return {
        success: true,
        log: activity
      };
    } catch (error) {
      console.error('Activity logging error:', error);
      return {
        success: false,
        error: 'Failed to log activity'
      };
    }
  }

  /**
   * Log student joining queue
   */
  static async logStudentJoinQueue(userId, ticketId, serviceId, details, req) {
    return this.logActivity({
      userId,
      ticketId,
      serviceId,
      action: 'STUDENT_JOIN_QUEUE',
      details: {
        ...details,
        timestamp: new Date().toISOString()
      },
      ipAddress: req?.ip || req?.connection?.remoteAddress,
      userAgent: req?.get('User-Agent')
    });
  }

  /**
   * Log student leaving queue
   */
  static async logStudentLeaveQueue(userId, ticketId, serviceId, details, req) {
    return this.logActivity({
      userId,
      ticketId,
      serviceId,
      action: 'STUDENT_LEAVE_QUEUE',
      details: {
        ...details,
        timestamp: new Date().toISOString()
      },
      ipAddress: req?.ip || req?.connection?.remoteAddress,
      userAgent: req?.get('User-Agent')
    });
  }

  /**
   * Log ticket being called
   */
  static async logTicketCalled(userId, ticketId, serviceId, details, req) {
    return this.logActivity({
      userId,
      ticketId,
      serviceId,
      action: 'TICKET_CALLED',
      details: {
        ...details,
        timestamp: new Date().toISOString()
      },
      ipAddress: req?.ip || req?.connection?.remoteAddress,
      userAgent: req?.get('User-Agent')
    });
  }

  /**
   * Log ticket completion
   */
  static async logTicketCompleted(userId, ticketId, serviceId, details, req) {
    return this.logActivity({
      userId,
      ticketId,
      serviceId,
      action: 'TICKET_COMPLETED',
      details: {
        ...details,
        completedAt: new Date().toISOString()
      },
      ipAddress: req?.ip || req?.connection?.remoteAddress,
      userAgent: req?.get('User-Agent')
    });
  }

  /**
   * Log service status changes
   */
  static async logServiceStatusChange(userId, serviceId, details, req) {
    return this.logActivity({
      userId,
      serviceId,
      action: 'SERVICE_STATUS_CHANGE',
      details: {
        ...details,
        changedAt: new Date().toISOString()
      },
      ipAddress: req?.ip || req?.connection?.remoteAddress,
      userAgent: req?.get('User-Agent')
    });
  }

  /**
   * Get activity history with advanced filtering
   */
  static async getActivityHistory(filters = {}) {
    const whereClause = {};
    
    if (filters.userId) whereClause.userId = filters.userId;
    if (filters.serviceId) whereClause.serviceId = filters.serviceId;
    if (filters.ticketId) whereClause.ticketId = filters.ticketId;
    if (filters.action) {
      if (Array.isArray(filters.action)) {
        whereClause.action = { [Op.in]: filters.action };
      } else {
        whereClause.action = filters.action;
      }
    }
    
    if (filters.startDate && filters.endDate) {
      whereClause.timestamp = {
        [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)]
      };
    } else if (filters.startDate) {
      whereClause.timestamp = { [Op.gte]: new Date(filters.startDate) };
    } else if (filters.endDate) {
      whereClause.timestamp = { [Op.lte]: new Date(filters.endDate) };
    }

    try {
      const activities = await ActivityLog.findAll({
        where: whereClause,
        order: [['timestamp', 'DESC']],
        limit: filters.limit || 100,
        offset: filters.offset || 0,
        include: [
          { 
            model: require('../models/User'), 
            attributes: ['id', 'firstName', 'lastName', 'email'],
            required: false
          },
          { 
            model: require('../models/Service'), 
            attributes: ['id', 'name', 'description'],
            required: false
          },
          { 
            model: require('../models/Ticket'), 
            attributes: ['id', 'ticketNumber', 'status'],
            required: false
          }
        ]
      });

      return {
        success: true,
        activities: activities.map(activity => ({
          ...activity.toJSON(),
          details: activity.details ? JSON.parse(activity.details) : null
        }))
      };
    } catch (error) {
      console.error('Error fetching activity history:', error);
      return {
        success: false,
        error: 'Failed to fetch activity history',
        activities: []
      };
    }
  }

  /**
   * Get user-specific activity logs
   */
  static async getUserActivity(userId, limit = 50, offset = 0) {
    try {
      const activities = await ActivityLog.findAll({
        where: { userId },
        order: [['timestamp', 'DESC']],
        limit,
        offset,
        include: [
          { 
            model: require('../models/Service'), 
            attributes: ['id', 'name'],
            required: false
          },
          { 
            model: require('../models/Ticket'), 
            attributes: ['id', 'ticketNumber'],
            required: false
          }
        ]
      });

      return {
        success: true,
        activities: activities.map(activity => ({
          ...activity.toJSON(),
          details: activity.details ? JSON.parse(activity.details) : null
        }))
      };
    } catch (error) {
      console.error('Error fetching user activity:', error);
      return {
        success: false,
        error: 'Failed to fetch user activity',
        activities: []
      };
    }
  }

  /**
   * Get service-specific activity logs
   */
  static async getServiceActivity(serviceId, limit = 100, offset = 0) {
    try {
      const activities = await ActivityLog.findAll({
        where: { serviceId },
        order: [['timestamp', 'DESC']],
        limit,
        offset,
        include: [
          { 
            model: require('../models/User'), 
            attributes: ['id', 'firstName', 'lastName'],
            required: false
          },
          { 
            model: require('../models/Ticket'), 
            attributes: ['id', 'ticketNumber'],
            required: false
          }
        ]
      });

      return {
        success: true,
        activities: activities.map(activity => ({
          ...activity.toJSON(),
          details: activity.details ? JSON.parse(activity.details) : null
        }))
      };
    } catch (error) {
      console.error('Error fetching service activity:', error);
      return {
        success: false,
        error: 'Failed to fetch service activity',
        activities: []
      };
    }
  }

  /**
   * Get activity statistics for dashboard
   */
  static async getActivityStats(filters = {}) {
    const whereClause = {};
    
    if (filters.userId) whereClause.userId = filters.userId;
    if (filters.serviceId) whereClause.serviceId = filters.serviceId;
    if (filters.startDate && filters.endDate) {
      whereClause.timestamp = {
        [Op.between]: [new Date(filters.startDate), new Date(filters.endDate)]
      };
    }

    try {
      const [totalLogs, actionCounts, dailyActivity] = await Promise.all([
        ActivityLog.count({ where: whereClause }),
        ActivityLog.findAll({
          where: whereClause,
          attributes: ['action', [require('sequelize').fn('COUNT', 'action'), 'count']],
          group: ['action'],
          raw: true
        }),
        ActivityLog.findAll({
          where: whereClause,
          attributes: [
            [require('sequelize').fn('DATE', require('sequelize').col('timestamp')), 'date'],
            [require('sequelize').fn('COUNT', '*'), 'count']
          ],
          group: [require('sequelize').fn('DATE', require('sequelize').col('timestamp'))],
          order: [[require('sequelize').fn('DATE', require('sequelize').col('timestamp')), 'DESC']],
          limit: 30,
          raw: true
        })
      ]);

      return {
        success: true,
        stats: {
          totalLogs,
          actionDistribution: actionCounts.reduce((acc, item) => {
            acc[item.action] = parseInt(item.count);
            return acc;
          }, {}),
          dailyActivity: dailyActivity.map(item => ({
            date: item.date,
            count: parseInt(item.count)
          }))
        }
      };
    } catch (error) {
      console.error('Error fetching activity stats:', error);
      return {
        success: false,
        error: 'Failed to fetch activity statistics'
      };
    }
  }

  /**
   * Cleanup old activity logs
   */
  static async cleanupOldLogs(daysToKeep = 90) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    try {
      const deletedCount = await ActivityLog.destroy({
        where: {
          timestamp: {
            [Op.lt]: cutoffDate
          }
        }
      });

      return {
        success: true,
        deletedCount,
        cutoffDate
      };
    } catch (error) {
      console.error('Error cleaning up old logs:', error);
      return {
        success: false,
        error: 'Failed to cleanup old logs'
      };
    }
  }
}

module.exports = new ActivityService();