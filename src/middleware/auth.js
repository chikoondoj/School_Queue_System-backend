const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticateSession = async (req, res, next) => {
  try {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const sessionUser = req.session.user;
    
    if (sessionUser.id === 'admin' || sessionUser.studentCode === 'admin') {
      req.user = {
        id: 'admin',
        role: 'ADMIN',
        studentCode: 'admin',
        name: 'Administrator',
        isAdmin: true
      };
      return next();
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: {
        id: true,
        studentCode: true,
        name: true,
        course: true,
        year: true,
        role: true,
        email: true,
        isActive: true,
      }
    });

    if (!user || !user.isActive) {
      req.session.destroy();
      return res.status(401).json({
        success: false,
        message: 'Invalid or inactive user'
      });
    }

    req.session.user = {
      id: user.id,
      studentCode: user.studentCode,
      name: user.name,
      role: user.role,
      isAdmin: user.isAdmin || false
    };

    req.user = user;
    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authentication verification failed'
    });
  }
};

const requireStudent = (req, res, next) => {
  authenticateSession(req, res, (err) => {
    if (err) return;
    
    if (req.user.role !== 'STUDENT') {
      return res.status(403).json({
        success: false,
        message: 'Student access required'
      });
    }
    next();
  });
};

const requireAdmin = (req, res, next) => {
  authenticateSession(req, res, (err) => {
    if (err) return;
    
    if (req.user.role !== 'ADMIN' && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }
    next();
  });
};

const requireAuth = authenticateSession;

const optionalAuth = async (req, res, next) => {
  if (req.session && req.session.user) {
    try {
      const sessionUser = req.session.user;
      
      if (sessionUser.id === 'admin' || sessionUser.studentCode === 'admin') {
        req.user = {
          id: 'admin',
          role: 'ADMIN',
          studentCode: 'admin',
          name: 'Administrator',
          isAdmin: true
        };
      } else {
        const user = await prisma.user.findUnique({
          where: { id: sessionUser.id },
          select: {
            id: true,
            studentCode: true,
            name: true,
            role: true,
            isActive: true,
            isAdmin: true
          }
        });
        
        if (user && user.isActive) {
          req.user = user;
        }
      }
    } catch (error) {
      console.error('Optional auth error:', error);
    }
  }
  next();
};

const validateSession = (req, res, next) => {
  if (!req.session) {
    return res.status(401).json({
      success: false,
      message: 'No session found'
    });
  }

  if (!req.sessionID) {
    return res.status(401).json({
      success: false,
      message: 'Invalid session ID'
    });
  }

  if (req.session.cookie && req.session.cookie.expires && new Date() > req.session.cookie.expires) {
    req.session.destroy();
    return res.status(401).json({
      success: false,
      message: 'Session expired'
    });
  }

  next();
};

const requireQueueAccess = (req, res, next) => {
  authenticateSession(req, res, (err) => {
    if (err) return;
    
    if (req.user.role !== 'STUDENT' && req.user.role !== 'ADMIN' && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Queue access denied'
      });
    }
    next();
  });
};

const requireSocketAuth = async (socket, next) => {
  try {
    const session = socket.request.session;
    
    if (!session || !session.user) {
      return next(new Error('Authentication required'));
    }

    const sessionUser = session.user;
    
    if (sessionUser.id === 'admin' || sessionUser.studentCode === 'admin') {
      socket.user = {
        id: 'admin',
        role: 'ADMIN',
        studentCode: 'admin',
        name: 'Administrator',
        isAdmin: true
      };
      return next();
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionUser.id },
      select: {
        id: true,
        studentCode: true,
        name: true,
        role: true,
        isActive: true,
        isAdmin: true
      }
    });

    if (!user || !user.isActive) {
      return next(new Error('Invalid or inactive user'));
    }

    socket.user = user;
    next();

  } catch (error) {
    next(new Error('Authentication verification failed'));
  }
};

const rateLimitByUser = (maxRequests = 100, windowMs = 60000) => {
  const userRequests = new Map();
  
  return (req, res, next) => {
    const userId = req.user?.id || req.ip;
    const now = Date.now();
    
    if (!userRequests.has(userId)) {
      userRequests.set(userId, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const userData = userRequests.get(userId);
    
    if (now > userData.resetTime) {
      userRequests.set(userId, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    if (userData.count >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests'
      });
    }
    
    userData.count++;
    next();
  };
};

const requireHealthCheck = (req, res, next) => {
  if (req.path === '/api/queue/health') {
    return next();
  }
  
  authenticateSession(req, res, next);
};

module.exports = {
  authenticateSession,
  requireStudent,
  requireAdmin,
  requireAuth,
  optionalAuth,
  validateSession,
  requireQueueAccess,
  requireSocketAuth,
  rateLimitByUser,
  requireHealthCheck,
  authenticateToken: authenticateSession
};