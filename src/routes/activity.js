// src/routes/activities.js
const express = require('express');
const router = express.Router();
const {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivitiesByUser,
  getActivityStats
} = require('../controllers/activityController');

// Import your authentication middleware
// const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Public routes (adjust based on your auth requirements)
router.get('/', getAllActivities);
router.get('/stats', getActivityStats);
router.get('/:id', getActivityById);
router.get('/user/:userId', getActivitiesByUser);

// Protected routes (uncomment and adjust middleware as needed)
// router.post('/', authenticateToken, createActivity);
// router.put('/:id', authenticateToken, updateActivity);
// router.delete('/:id', authenticateToken, requireAdmin, deleteActivity);

// For now, without auth middleware:
router.post('/', createActivity);
router.put('/:id', updateActivity);
router.delete('/:id', deleteActivity);

module.exports = router;