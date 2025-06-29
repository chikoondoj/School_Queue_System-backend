// src/controllers/activityController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all activities
const getAllActivities = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status, userId } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (type) where.type = type;
    if (status) where.status = status;
    if (userId) where.userId = userId;

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, name: true, email: true }
          }
        }
      }),
      prisma.activity.count({ where })
    ]);

    res.json({
      success: true,
      data: activities,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activities',
      error: error.message
    });
  }
};

// Get activity by ID
const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;

    const activity = await prisma.activity.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    res.json({
      success: true,
      data: activity
    });
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity',
      error: error.message
    });
  }
};

// Create new activity
const createActivity = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      status = 'active',
      startDate,
      endDate,
      userId,
      metadata
    } = req.body;

    // Validation
    if (!title || !type) {
      return res.status(400).json({
        success: false,
        message: 'Title and type are required'
      });
    }

    const activityData = {
      title,
      description,
      type,
      status,
      metadata
    };

    if (startDate) activityData.startDate = new Date(startDate);
    if (endDate) activityData.endDate = new Date(endDate);
    if (userId) activityData.userId = userId;

    const activity = await prisma.activity.create({
      data: activityData,
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      data: activity
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create activity',
      error: error.message
    });
  }
};

// Update activity
const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      type,
      status,
      startDate,
      endDate,
      userId,
      metadata
    } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (status !== undefined) updateData.status = status;
    if (startDate !== undefined) updateData.startDate = startDate ? new Date(startDate) : null;
    if (endDate !== undefined) updateData.endDate = endDate ? new Date(endDate) : null;
    if (userId !== undefined) updateData.userId = userId;
    if (metadata !== undefined) updateData.metadata = metadata;

    const activity = await prisma.activity.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json({
      success: true,
      message: 'Activity updated successfully',
      data: activity
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    console.error('Error updating activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update activity',
      error: error.message
    });
  }
};

// Delete activity
const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.activity.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    console.error('Error deleting activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete activity',
      error: error.message
    });
  }
};

// Get activities by user
const getActivitiesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, type } = req.query;

    const where = { userId };
    if (status) where.status = status;
    if (type) where.type = type;

    const activities = await prisma.activity.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    console.error('Error fetching user activities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user activities',
      error: error.message
    });
  }
};

// Get activity statistics
const getActivityStats = async (req, res) => {
  try {
    const [
      total,
      activeCount,
      completedCount,
      byType
    ] = await Promise.all([
      prisma.activity.count(),
      prisma.activity.count({ where: { status: 'active' } }),
      prisma.activity.count({ where: { status: 'completed' } }),
      prisma.activity.groupBy({
        by: ['type'],
        _count: { type: true }
      })
    ]);

    const stats = {
      total,
      active: activeCount,
      completed: completedCount,
      inactive: total - activeCount - completedCount,
      byType: byType.reduce((acc, item) => {
        acc[item.type] = item._count.type;
        return acc;
      }, {})
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching activity stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity statistics',
      error: error.message
    });
  }
};

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivitiesByUser,
  getActivityStats
};