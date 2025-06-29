const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const { requireAdmin } = require('../middleware/auth');

// Admin dashboard - matches getDashboard method
router.get('/dashboard', requireAdmin, adminController.getDashboard);

// Service queue management - matches existing controller methods
router.get('/services/:serviceId/queue', requireAdmin, adminController.getServiceQueue);
router.post('/services/:serviceId/call-next', requireAdmin, adminController.callNext);
router.post('/services/:serviceId/complete', requireAdmin, adminController.completeService);

// Queue management - ADD THIS for your frontend cancel-service call
router.post('/cancel-service', requireAdmin, adminController.cancelService);


// Queue history - matches getQueueHistory method
router.get('/history', requireAdmin, adminController.getQueueHistory);

module.exports = router;