// server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const { Server } = require("socket.io");
const cron = require("node-cron");
const pgSession = require("connect-pg-simple")(session);
const { Pool } = require("pg");
require("dotenv").config();

// Import services and utilities
const SocketService = require("./src/services/socketService");
const QueueService = require("./src/services/queueService");
const ActivityService = require("./src/services/activityService");
const QueueStatistics = require("./src/models/queueStatistics");
const QueueCalculations = require("./src/utils/queueCalculations");
const { requireSocketAuth } = require("./src/middleware/auth");

// Import routes
const authRoutes = require("./src/routes/auth");
const queueRoutes = require("./src/routes/queue");
const ticketsRoutes = require("./src/routes/tickets");
const adminRoutes = require("./src/routes/admin");
const activityRoutes = require("./src/routes/activity");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Initialize Socket.IO with enhanced configuration
const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  pingTimeout: 60000,
  pingInterval: 25000,
});

const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  family: 4,
});

const sessionMiddleware = session({
  store: new pgSession({
    pool: pgPool,
    tableName: "user_sessions",
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET || "your-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
  },
  name: "queueSessionId",
});

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
    retryAfter: 15 * 60, // 15 minutes in seconds
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path.includes("/health");
  },
});

// API-specific rate limiting
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // More restrictive for API calls
  message: {
    success: false,
    message: "API rate limit exceeded. Please slow down your requests.",
  },
});

// Middleware setup
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.CLIENT_URL]
    : ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.set("trust proxy", 1);
app.use(sessionMiddleware);
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
      ],
      connectSrc: [
        "'self'",
        "wss:",
        "https://school-queue-system-frontend.vercel.app",
        "https://school-queue-system-backend.onrender.com",
      ],
      imgSrc: ["'self'", "data:", "blob:", "https:"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com",
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com",
      ],
      objectSrc: ["'none'"],
      frameSrc: ["'none'"],
    },
  })
);

app.get("/api/test-cookie", (req, res) => {
  res.cookie("checkCookie", "works", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Cookie set" });
});

app.use(limiter);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(
  express.json({
    limit: "10mb",
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).json({
          success: false,
          message: "Invalid JSON payload",
        });
        throw new Error("Invalid JSON");
      }
    },
  })
);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Initialize Socket Service
const socketService = new SocketService(io);

// Make socket service available to routes
app.locals.socketService = socketService;
app.locals.io = io;

// Socket.IO middleware
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.use(requireSocketAuth);

// Socket.IO connection handling with enhanced features
const queueRooms = new Map();
const userSockets = new Map();
const adminSockets = new Map();
const serviceWindows = new Map();

io.on("connection", (socket) => {
  console.log(
    `🔌 User connected: ${socket.id} (${
      socket.user.studentCode || socket.user.email
    })`
  );

  // Store user socket mapping
  userSockets.set(socket.user.id, {
    socketId: socket.id,
    user: socket.user,
    connectedAt: new Date(),
    lastActivity: new Date(),
  });

  // Store admin sockets separately for admin-specific broadcasts
  if (socket.user.role === "ADMIN" || socket.user.isAdmin) {
    adminSockets.set(socket.user.id, socket.id);
    socket.join("admin-room");
  }

  // Update last activity on any socket event
  const updateLastActivity = () => {
    const userSocket = userSockets.get(socket.user.id);
    if (userSocket) {
      userSocket.lastActivity = new Date();
    }
  };

  // Enhanced queue room management
  socket.on("joinQueueRoom", (data = {}) => {
    const { serviceId } = data;
    socket.join("queue-updates");

    if (serviceId) {
      socket.join(`queue-${serviceId}`);
    }

    socket.emit("joinedQueueRoom", {
      success: true,
      timestamp: new Date(),
      connectedUsers: userSockets.size,
    });

    updateLastActivity();

    // Log the activity
    ActivityService.logActivity({
      userId: socket.user.id,
      action: "USER_CONNECTED",
      details: { socketId: socket.id, serviceId },
      ipAddress: socket.request.connection.remoteAddress,
      userAgent: socket.request.headers["user-agent"],
    });
  });

  // Student queue events with enhanced logging
  socket.on("studentJoinedQueue", async (data) => {
    updateLastActivity();

    const queueData = {
      type: "STUDENT_JOINED",
      data: {
        studentCode: socket.user.studentCode,
        name:
          socket.user.name ||
          `${socket.user.firstName} ${socket.user.lastName}`,
        serviceId: data.serviceId,
        ticketId: data.ticketId,
        position: data.position,
        estimatedWaitTime: data.estimatedWaitTime,
        timestamp: new Date(),
      },
    };

    // Broadcast to all queue watchers
    socket.to("queue-updates").emit("queueUpdate", queueData);

    // Broadcast to specific service watchers
    if (data.serviceId) {
      socket
        .to(`queue-${data.serviceId}`)
        .emit("serviceQueueUpdate", queueData);
    }

    // Log the activity
    await ActivityService.logStudentJoinQueue(
      socket.user.id,
      data.ticketId,
      data.serviceId,
      { position: data.position, estimatedWaitTime: data.estimatedWaitTime },
      socket.request
    );
  });

  socket.on("studentLeftQueue", async (data) => {
    updateLastActivity();

    const queueData = {
      type: "STUDENT_LEFT",
      data: {
        studentCode: socket.user.studentCode,
        ticketId: data.ticketId,
        serviceId: data.serviceId,
        reason: data.reason || "manual_leave",
        timestamp: new Date(),
      },
    };

    socket.to("queue-updates").emit("queueUpdate", queueData);

    if (data.serviceId) {
      socket
        .to(`queue-${data.serviceId}`)
        .emit("serviceQueueUpdate", queueData);
    }

    // Log the activity
    await ActivityService.logStudentLeaveQueue(
      socket.user.id,
      data.ticketId,
      data.serviceId,
      { reason: data.reason },
      socket.request
    );
  });

  // Position update requests
  socket.on("requestPositionUpdate", async (data) => {
    updateLastActivity();

    try {
      // Get real-time position from queue service
      const positionData = await QueueService.getTicketPosition(data.ticketId);

      socket.emit("positionUpdate", {
        ticketId: data.ticketId,
        position: positionData.position,
        estimatedWaitTime: positionData.estimatedWaitTime,
        queueLength: positionData.queueLength,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error getting position update:", error);
      socket.emit("positionUpdateError", {
        ticketId: data.ticketId,
        error: "Failed to get position update",
      });
    }
  });

  // Admin-only events
  socket.on("adminTicketUpdate", async (data) => {
    if (socket.user.role !== "ADMIN" && !socket.user.isAdmin) {
      socket.emit("error", { message: "Unauthorized: Admin access required" });
      return;
    }

    updateLastActivity();

    const updateData = {
      type: "ADMIN_TICKET_UPDATE",
      ticket: data.ticket,
      updatedBy: {
        id: socket.user.id,
        name:
          socket.user.name ||
          `${socket.user.firstName} ${socket.user.lastName}`,
      },
      timestamp: new Date(),
    };

    io.to("queue-updates").emit("ticketUpdate", updateData);

    // Log admin activity
    await ActivityService.logActivity({
      userId: socket.user.id,
      ticketId: data.ticket.id,
      serviceId: data.ticket.serviceId,
      action: "ADMIN_TICKET_UPDATE",
      details: {
        previousStatus: data.previousStatus,
        newStatus: data.ticket.status,
      },
      ipAddress: socket.request.connection.remoteAddress,
      userAgent: socket.request.headers["user-agent"],
    });
  });

  socket.on("adminCallTicket", async (data) => {
    if (socket.user.role !== "ADMIN" && !socket.user.isAdmin) {
      socket.emit("error", { message: "Unauthorized: Admin access required" });
      return;
    }

    updateLastActivity();

    const callData = {
      ticketId: data.ticketId,
      studentCode: data.studentCode,
      serviceWindow: data.serviceWindow,
      calledBy: {
        id: socket.user.id,
        name:
          socket.user.name ||
          `${socket.user.firstName} ${socket.user.lastName}`,
      },
      timestamp: new Date(),
    };

    io.to("queue-updates").emit("ticketCalled", callData);

    // Notify the specific student if they're connected
    const studentSocket = Array.from(userSockets.values()).find(
      (us) => us.user.studentCode === data.studentCode
    );

    if (studentSocket) {
      io.to(studentSocket.socketId).emit("yourTicketCalled", {
        ...callData,
        message: `Your ticket has been called to ${data.serviceWindow}`,
      });
    }

    // Log the activity
    await ActivityService.logTicketCalled(
      socket.user.id,
      data.ticketId,
      data.serviceId,
      { serviceWindow: data.serviceWindow, studentCode: data.studentCode },
      socket.request
    );
  });

  socket.on("serviceStatusUpdate", async (data) => {
    if (socket.user.role !== "ADMIN" && !socket.user.isAdmin) {
      socket.emit("error", { message: "Unauthorized: Admin access required" });
      return;
    }

    updateLastActivity();

    const statusData = {
      serviceId: data.serviceId,
      status: data.status,
      availableWindows: data.availableWindows,
      updatedBy: {
        id: socket.user.id,
        name:
          socket.user.name ||
          `${socket.user.firstName} ${socket.user.lastName}`,
      },
      timestamp: new Date(),
    };

    io.to("queue-updates").emit("serviceStatusUpdate", statusData);
    io.to(`queue-${data.serviceId}`).emit("serviceStatusUpdate", statusData);

    // Log service status change
    await ActivityService.logServiceStatusChange(
      socket.user.id,
      data.serviceId,
      {
        oldStatus: data.oldStatus,
        newStatus: data.status,
        availableWindows: data.availableWindows,
      },
      socket.request
    );
  });

  // Handle service window management
  socket.on("registerServiceWindow", (data) => {
    if (socket.user.role !== "ADMIN" && !socket.user.isAdmin) {
      socket.emit("error", { message: "Unauthorized: Admin access required" });
      return;
    }

    serviceWindows.set(socket.id, {
      windowId: data.windowId,
      serviceId: data.serviceId,
      operatorId: socket.user.id,
      status: "available",
    });

    socket.join(`service-${data.serviceId}-operators`);
    socket.emit("serviceWindowRegistered", {
      success: true,
      windowId: data.windowId,
    });
  });

  // Handle disconnection with cleanup
  socket.on("disconnect", async (reason) => {
    console.log(
      `🔌 User disconnected: ${socket.id} (${
        socket.user?.studentCode || socket.user?.email
      }) - Reason: ${reason}`
    );

    // Clean up user socket mapping
    userSockets.delete(socket.user?.id);
    adminSockets.delete(socket.user?.id);

    // Clean up service window if registered
    serviceWindows.delete(socket.id);

    // Notify other users
    socket.to("queue-updates").emit("userDisconnected", {
      studentCode: socket.user?.studentCode,
      userId: socket.user?.id,
      reason,
      timestamp: new Date(),
    });

    // Log disconnection
    if (socket.user) {
      await ActivityService.logActivity({
        userId: socket.user.id,
        action: "USER_DISCONNECTED",
        details: { reason, socketId: socket.id },
        ipAddress: socket.request.connection.remoteAddress,
        userAgent: socket.request.headers["user-agent"],
      });
    }
  });

  // Handle socket errors
  socket.on("error", (error) => {
    console.error(`Socket error for user ${socket.user?.id}:`, error);
  });
});

// Static file serving
app.use(express.static("public"));
app.use(express.static("views"));

// API Routes with rate limiting
app.use("/api/auth", authRoutes);
app.use("/api/queue", apiLimiter, queueRoutes);
app.use("/api/tickets", apiLimiter, ticketsRoutes);
app.use("/api/admin", apiLimiter, adminRoutes);
app.use("/api/activities", apiLimiter, activityRoutes);

// Enhanced health check endpoints
app.get("/api/health", (req, res) => {
  const memoryUsage = process.memoryUsage();
  const uptime = process.uptime();

  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    uptime: `${Math.floor(uptime / 60)} minutes`,
    memory: {
      used: Math.round(memoryUsage.heapUsed / 1024 / 1024) + " MB",
      total: Math.round(memoryUsage.heapTotal / 1024 / 1024) + " MB",
    },
    connections: {
      connectedUsers: userSockets.size,
      adminUsers: adminSockets.size,
      totalSockets: io.engine.clientsCount,
      activeServiceWindows: serviceWindows.size,
    },
    version: process.env.npm_package_version || "1.0.0",
  });
});

app.get("/api/queue/health", (req, res) => {
  res.json({
    status: "OK",
    queueSystem: "operational",
    realTimeUpdates: "active",
    connectedClients: io.engine.clientsCount,
    activeQueues: queueRooms.size,
    serviceWindows: serviceWindows.size,
    lastUpdate: new Date().toISOString(),
    statistics: {
      totalConnections: userSockets.size,
      adminConnections: adminSockets.size,
    },
  });
});

app.get("/", (req, res) => {
  res.send("🎉 API server is running!");
});

// Enhanced broadcasting functions
const broadcastQueueUpdate = (updateData, serviceId = null) => {
  io.to("queue-updates").emit("queueUpdate", {
    ...updateData,
    timestamp: new Date(),
  });

  if (serviceId) {
    io.to(`queue-${serviceId}`).emit("serviceQueueUpdate", {
      ...updateData,
      timestamp: new Date(),
    });
  }
};

const broadcastTicketUpdate = (ticketData) => {
  io.to("queue-updates").emit("ticketUpdate", {
    ...ticketData,
    timestamp: new Date(),
  });
};

const notifyUser = (userId, eventType, data) => {
  const userSocket = userSockets.get(userId);
  if (userSocket) {
    io.to(userSocket.socketId).emit(eventType, {
      ...data,
      timestamp: new Date(),
    });
    return true;
  }
  return false;
};

const notifyAdmins = (eventType, data) => {
  io.to("admin-room").emit(eventType, {
    ...data,
    timestamp: new Date(),
  });
};

const getConnectedUsers = () => {
  return Array.from(userSockets.values()).map((socket) => ({
    userId: socket.user.id,
    studentCode: socket.user.studentCode,
    name:
      socket.user.name || `${socket.user.firstName} ${socket.user.lastName}`,
    role: socket.user.role,
    connectedAt: socket.connectedAt,
    lastActivity: socket.lastActivity,
  }));
};

// Queue statistics update job - runs every 30 seconds
const updateQueueStatistics = async () => {
  try {
    console.log("🔄 Updating queue statistics...");
    const services = await QueueService.getAllServices();

    for (const service of services) {
      try {
        const [activeTickets, completedTickets] = await Promise.all([
          QueueService.getActiveTicketsForService(service.id),
          QueueService.getCompletedTicketsForService(service.id, 24), // Last 24 hours
        ]);

        const averageServiceTime =
          QueueCalculations.calculateAverageServiceTime(completedTickets);
        const estimatedWaitTime = QueueCalculations.calculateEstimatedWaitTime(
          activeTickets.length,
          averageServiceTime,
          service.availableWindows || 1
        );

        if (!service || !service.id) {
          console.warn(
            "Skipping stats update due to missing service or service.id"
          );
          return;
        }

        // Update statistics in database
        await QueueStatistics.upsert({
          serviceId: service.id,
          currentQueueLength: activeTickets.length,
          estimatedWaitTime,
          averageServiceTime,
          isActive: service.isActive,
          availableWindows: service.availableWindows || 1,
          completedTicketsToday: completedTickets.length,
          lastUpdated: new Date(),
        });

        // Broadcast real-time updates
        const updateData = {
          type: "STATISTICS_UPDATE",
          serviceId: service.id,
          data: {
            currentQueueLength: activeTickets.length,
            estimatedWaitTime,
            averageServiceTime,
            isActive: service.isActive,
            availableWindows: service.availableWindows || 1,
            activeTickets: activeTickets.map((ticket, index) => ({
              id: ticket.id,
              ticketNumber: ticket.ticketNumber,
              position: index + 1,
              estimatedCallTime: new Date(
                Date.now() + index * averageServiceTime * 1000
              ),
            })),
          },
        };

        // Broadcast to all queue watchers
        socketService.emitQueueUpdate(service.id, updateData);

        // Also broadcast via our socket system
        broadcastQueueUpdate(updateData, service.id);
      } catch (serviceError) {
        console.error(
          `Error updating statistics for service ${service.id || "unknown"}:`,
          serviceError
        );
      }
    }

    console.log("✅ Queue statistics updated successfully");
  } catch (error) {
    console.error("❌ Queue statistics update error:", error);
  }
};

// Start the statistics update job
const statisticsInterval = setInterval(updateQueueStatistics, 30000); // Every 30 seconds

// Cleanup inactive connections every 5 minutes
const cleanupInterval = setInterval(() => {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  let cleanedCount = 0;

  for (const [userId, userSocket] of userSockets.entries()) {
    if (userSocket.lastActivity < fiveMinutesAgo) {
      // Check if socket is still connected
      const socket = io.sockets.sockets.get(userSocket.socketId);
      if (!socket || !socket.connected) {
        userSockets.delete(userId);
        adminSockets.delete(userId);
        cleanedCount++;
      }
    }
  }

  if (cleanedCount > 0) {
    console.log(`🧹 Cleaned up ${cleanedCount} inactive connections`);
  }
}, 5 * 60 * 1000);

// Scheduled task for cleaning up old activity logs (runs daily at 2 AM)
if (process.env.NODE_ENV === "production") {
  cron.schedule("0 2 * * *", async () => {
    console.log("🗑️ Running activity log cleanup...");
    try {
      const result = await ActivityService.cleanupOldLogs(90); // Keep 90 days
      console.log(`✅ Cleaned up ${result.deletedCount} old activity logs`);
    } catch (error) {
      console.error("❌ Activity log cleanup failed:", error);
    }
  });
}

// Enhanced error handling middleware
app.use((error, req, res, next) => {
  console.error("🚨 Server Error:", error);

  // Log error activity
  ActivityService.logActivity({
    action: "SERVER_ERROR",
    details: {
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      url: req.url,
      method: req.method,
      userAgent: req.get("User-Agent"),
    },
    ipAddress: req.ip,
  }).catch((logError) => {
    console.error("Failed to log error activity:", logError);
  });

  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.details || error.message,
    });
  }

  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  if (error.name === "UnauthorizedError") {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  // Database errors
  if (
    error.name === "SequelizeError" ||
    error.name === "PrismaClientKnownRequestError"
  ) {
    return res.status(500).json({
      success: false,
      message: "Database operation failed",
    });
  }

  res.status(error.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
    method: req.method,
  });
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);

  // Clear intervals
  clearInterval(statisticsInterval);
  clearInterval(cleanupInterval);

  // Close socket connections
  io.close(() => {
    console.log("✅ Socket.IO server closed");
  });

  // Close HTTP server
  server.close(() => {
    console.log("✅ HTTP server closed");
    process.exit(0);
  });

  // Force exit after 10 seconds
  setTimeout(() => {
    console.log("❌ Forcing exit after timeout");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Start server
server.listen(PORT, () => {
  console.log("🚀 ================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎯 Queue health: http://localhost:${PORT}/api/queue/health`);
  console.log(`⚡ Socket.IO server ready for real-time updates`);
  console.log(`📈 Queue statistics updating every 30 seconds`);
  console.log(`🧹 Connection cleanup running every 5 minutes`);
  console.log("🚀 ================================");

  // Initial statistics update
  setTimeout(updateQueueStatistics, 5000); // Wait 5 seconds after startup
});

// Export for testing and external use
module.exports = {
  app,
  server,
  io,
  socketService,
  broadcastQueueUpdate,
  broadcastTicketUpdate,
  notifyUser,
  notifyAdmins,
  getConnectedUsers,
  updateQueueStatistics,
};
