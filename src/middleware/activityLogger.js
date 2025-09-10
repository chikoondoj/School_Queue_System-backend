const ActivityService = require("../services/activityService");

async function activityLogger(req, res, next) {
  try {
    // Only log if user is authenticated
    if (req.user) {
      // Default action: METHOD + PATH
      let action = `${req.method} ${req.path}`;

      // Optional: add route params to make it more descriptive
      if (Object.keys(req.params).length > 0) {
        action += ` - Params: ${JSON.stringify(req.params)}`;
      }

      // Log the activity
      await ActivityService.logActivity({
        userId: req.user.id,
        action,
        ipAddress: req.ip,
        meta: {
          body: req.body,
          query: req.query,
        },
      });
    }
  } catch (err) {
    console.error("Activity logging error:", err);
    // Do not block the request if logging fails
  } finally {
    next();
  }
}

module.exports = activityLogger;