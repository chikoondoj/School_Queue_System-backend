const express = require('express');
const path = require('path');
const router = express.Router();

const authController = require('../controllers/authController');
const { authenticateSession } = require('../middleware/auth');
const { getActivitiesByUser } = require('../controllers/activityController');
const {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateAdminRegister,
  validateAdminLogin,
  validateChangePassword
} = require('../middleware/validation');

// Student login page
router.get('/student/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/pages/studentLogin.html'));
});

// Admin dashboard page
router.get('/admin/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/pages/adminDashboard.html'));
});

// Debug middleware for login
const debugSession = (req, res, next) => {
    // Store original res.json to intercept successful responses
    const originalJson = res.json;
    res.json = function(data) {
        // Only log if response indicates success
        if (data && data.success) {
            console.log('🔧 DEBUG - Session after login:', req.session);
            console.log('🔧 DEBUG - Session ID:', req.sessionID);
            console.log('🔧 DEBUG - User stored in session:', req.session.user);
        }
        // Call original json method
        return originalJson.call(this, data);
    };
    next();
};

// Public routes
router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, debugSession, authController.login);
router.post('/admin-register', validateAdminRegister, authController.adminRegister);
router.post('/admin-login', validateAdminLogin, authController.adminLogin);

// Protected routes
router.get('/profile', authenticateSession, authController.getProfile);
router.put('/profile', authenticateSession, validateUpdateProfile, authController.updateProfile);
router.put('/change-password', authenticateSession, validateChangePassword, authController.changePassword);

// Recent activity for current user - using existing controller
router.get('/activity', authenticateSession, (req, res) => {
    try {
        // Set the userId parameter to match what the controller expects
        req.params.userId = req.user.id;
        
        // Use the existing controller function
        return getActivitiesByUser(req, res);
    } catch (error) {
        console.error('Error in activity route:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch activities',
            error: error.message
        });
    }
});

module.exports = router;