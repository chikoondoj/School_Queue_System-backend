const express = require("express");
const path = require("path");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const authController = require("../controllers/authController");
const {
  authenticateSession,
  requireAuth,
  requireStudent,
  validateSession,
} = require("../middleware/auth");
const { getActivitiesByUser } = require("../controllers/activityController");
const {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  validateAdminLogin,
  validateAdminRegister
} = require("../middleware/validation");

const prisma = new PrismaClient();

router.get("/student/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/pages/studentLogin.html"));
});

router.get("/admin/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/pages/adminDashboard.html"));
});

const debugSession = (req, res, next) => {
  const originalJson = res.json;
  res.json = function (data) {
    if (data && data.success) {
      console.log("🔧 DEBUG - Session after login:", req.session);
      console.log("🔧 DEBUG - Session ID:", req.sessionID);
      console.log("🔧 DEBUG - User stored in session:", req.session.user);
    }
    return originalJson.call(this, data);
  };
  next();
};

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, debugSession, authController.login);
router.post('/admin-register', validateAdminRegister, authController.adminRegister);
router.post('/admin-login', validateAdminLogin, authController.adminLogin);

router.get("/profile", authenticateSession, authController.getProfile);
router.put(
  "/profile",
  authenticateSession,
  validateUpdateProfile,
  authController.updateProfile
);
router.put(
  "/change-password",
  authenticateSession,
  validateChangePassword,
  authController.changePassword
);

router.get("/activity", authenticateSession, (req, res) => {
  try {
    req.params.userId = req.user.id;
    return getActivitiesByUser(req, res);
  } catch (error) {
    console.error("Error in activity route:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
      error: error.message,
    });
  }
});

router.use("/api/queue", validateSession);

router.get("/api/queue/services", async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        description: true,
        estimatedTime: true,
        isActive: true,
      },
    });

    res.json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
    });
  }
});

router.get("/api/queue/services/detailed", async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      include: {
        tickets: {
          where: {
            status: { in: ["WAITING", "IN_PROGRESS"] },
          },
        },
      },
    });

    const detailedServices = services.map((service) => {
      const waitingCount = service.tickets.filter(
        (t) => t.status === "WAITING"
      ).length;
      const inProgressCount = service.tickets.filter(
        (t) => t.status === "IN_PROGRESS"
      ).length;
      const estimatedWaitTime = waitingCount * (service.estimatedTime || 15);

      return {
        id: service.id,
        name: service.name,
        description: service.description,
        estimatedTime: service.estimatedTime,
        waitingCount,
        inProgressCount,
        totalInQueue: waitingCount + inProgressCount,
        estimatedWaitTime,
        isActive: service.isActive,
      };
    });

    res.json({
      success: true,
      services: detailedServices,
    });
  } catch (error) {
    console.error("Error fetching detailed services:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch detailed services",
    });
  }
});

router.get("/api/queue/my-ticket", requireStudent, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { studentCode: req.user.studentCode },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const ticket = await prisma.tickets.findFirst({
      where: {
        userId: user.id,
        status: { in: ["WAITING", "CALLED", "IN_PROGRESS"] },
      },
      include: {
        service: {
          select: {
            name: true,
            description: true,
            estimatedTime: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!ticket) {
      return res.json({
        success: true,
        ticket: null,
        message: "No active ticket found",
      });
    }

    const position =
      (await prisma.tickets.count({
        where: {
          serviceId: ticket.serviceId,
          status: "WAITING",
          createdAt: { lt: ticket.createdAt },
        },
      })) + 1;

    res.json({
      success: true,
      ticket: {
        ...ticket,
        position: ticket.status === "WAITING" ? position : null,
      },
    });
  } catch (error) {
    console.error("Error fetching user ticket:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ticket",
    });
  }
});

router.get(
  "/api/queue/my-ticket/detailed",
  requireStudent,
  async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { studentCode: req.user.studentCode },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const ticket = await prisma.tickets.findFirst({
        where: {
          userId: user.id,
          status: { in: ["WAITING", "CALLED", "IN_PROGRESS"] },
        },
        include: {
          service: true,
          user: {
            select: {
              studentCode: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      if (!ticket) {
        return res.json({
          success: true,
          ticket: null,
          message: "No active ticket found",
        });
      }

      const position =
        (await prisma.tickets.count({
          where: {
            serviceId: ticket.serviceId,
            status: "WAITING",
            createdAt: { lt: ticket.createdAt },
          },
        })) + 1;

      const totalInQueue = await prisma.tickets.count({
        where: {
          serviceId: ticket.serviceId,
          status: "WAITING",
        },
      });

      const estimatedWaitTime = position * (ticket.service.estimatedTime || 15);

      res.json({
        success: true,
        ticket: {
          ...ticket,
          position: ticket.status === "WAITING" ? position : null,
          totalInQueue,
          estimatedWaitTime,
          queuedAt: ticket.createdAt,
          waitTime: Math.floor((new Date() - ticket.createdAt) / 1000 / 60),
        },
      });
    } catch (error) {
      console.error("Error fetching detailed ticket:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch detailed ticket",
      });
    }
  }
);

router.get("/api/queue/position/:ticketId", async (req, res) => {
  try {
    const { ticketId } = req.params;

    const ticket = await prisma.tickets.findUnique({
      where: { id: ticketId },
      include: { service: true },
    });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    if (ticket.status !== "WAITING") {
      return res.json({
        success: true,
        position: null,
        status: ticket.status,
        message: "Ticket is not in waiting status",
      });
    }

    const position =
      (await prisma.tickets.count({
        where: {
          serviceId: ticket.serviceId,
          status: "WAITING",
          createdAt: { lt: ticket.createdAt },
        },
      })) + 1;

    const totalInQueue = await prisma.tickets.count({
      where: {
        serviceId: ticket.serviceId,
        status: "WAITING",
      },
    });

    res.json({
      success: true,
      position,
      totalInQueue,
      status: ticket.status,
      estimatedWaitTime: position * (ticket.service.estimatedTime || 15),
    });
  } catch (error) {
    console.error("Error fetching ticket position:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ticket position",
    });
  }
});

router.get("/api/queue/history", requireStudent, async (req, res) => {
  try {
    const { limit = 10, offset = 0, serviceId } = req.query;

    const user = await prisma.user.findUnique({
      where: { studentCode: req.user.studentCode },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const whereClause = {
      userId: user.id,
      status: { in: ["COMPLETED", "CANCELLED"] },
    };

    if (serviceId) {
      whereClause.serviceId = serviceId;
    }

    const tickets = await prisma.tickets.findMany({
      where: whereClause,
      include: {
        service: {
          select: {
            name: true,
            description: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: parseInt(limit),
      skip: parseInt(offset),
    });

    const total = await prisma.tickets.count({ where: whereClause });

    res.json({
      success: true,
      tickets,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: parseInt(offset) + parseInt(limit) < total,
      },
    });
  } catch (error) {
    console.error("Error fetching queue history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch queue history",
    });
  }
});

router.get("/api/queue/statistics", async (req, res) => {
  try {
    const { period = "7d" } = req.query;

    let dateFilter = new Date();
    switch (period) {
      case "1d":
        dateFilter.setDate(dateFilter.getDate() - 1);
        break;
      case "7d":
        dateFilter.setDate(dateFilter.getDate() - 7);
        break;
      case "30d":
        dateFilter.setDate(dateFilter.getDate() - 30);
        break;
      default:
        dateFilter.setDate(dateFilter.getDate() - 7);
    }

    const totalTickets = await prisma.tickets.count({
      where: { createdAt: { gte: dateFilter } },
    });

    const completedTickets = await prisma.tickets.count({
      where: {
        createdAt: { gte: dateFilter },
        status: "COMPLETED",
      },
    });

    const cancelledTickets = await prisma.tickets.count({
      where: {
        createdAt: { gte: dateFilter },
        status: "CANCELLED",
      },
    });

    const activeTickets = await prisma.tickets.count({
      where: {
        status: { in: ["WAITING", "CALLED", "IN_PROGRESS"] },
      },
    });

    const serviceStats = await prisma.service.findMany({
      include: {
        tickets: {
          where: { createdAt: { gte: dateFilter } },
        },
      },
    });

    const serviceStatistics = serviceStats.map((service) => ({
      serviceName: service.name,
      totalTickets: service.tickets.length,
      completedTickets: service.tickets.filter((t) => t.status === "COMPLETED")
        .length,
      averageWaitTime: service.estimatedTime || 15,
    }));

    res.json({
      success: true,
      statistics: {
        period,
        totalTickets,
        completedTickets,
        cancelledTickets,
        activeTickets,
        completionRate:
          totalTickets > 0
            ? ((completedTickets / totalTickets) * 100).toFixed(2)
            : 0,
        serviceStatistics,
      },
    });
  } catch (error) {
    console.error("Error fetching queue statistics:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch queue statistics",
    });
  }
});

router.get("/api/queue/health", async (req, res) => {
  try {
    const dbStatus = await prisma.$queryRaw`SELECT 1`;

    const activeServices = await prisma.service.count({
      where: { isActive: true },
    });

    const activeTickets = await prisma.tickets.count({
      where: {
        status: { in: ["WAITING", "CALLED", "IN_PROGRESS"] },
      },
    });

    res.json({
      success: true,
      health: {
        database: dbStatus ? "connected" : "disconnected",
        activeServices,
        activeTickets,
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      },
    });
  } catch (error) {
    console.error("Error checking system health:", error);
    res.status(500).json({
      success: false,
      message: "System health check failed",
      health: {
        database: "error",
        timestamp: new Date().toISOString(),
      },
    });
  }
});

router.post("/join", requireStudent, async (req, res) => {
  try {
    const { serviceId } = req.body;
    const studentCode = req.user.studentCode;

    if (!serviceId) {
      return res.status(400).json({
        success: false,
        message: "Service ID is required",
      });
    }

    const user = await prisma.user.findUnique({
      where: { studentCode: studentCode },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const existingTicket = await prisma.tickets.findFirst({
      where: {
        userId: user.id,
        status: { in: ["WAITING", "CALLED", "IN_PROGRESS"] },
      },
    });

    if (existingTicket) {
      return res.status(400).json({
        success: false,
        message: "You already have an active ticket",
      });
    }

    const service = await prisma.service.findFirst({
      where: {
        OR: [{ id: serviceId }, { name: serviceId }],
        isActive: true,
      },
    });

    if (!service) {
      return res.status(400).json({
        success: false,
        message: "Service not found or inactive",
      });
    }

    const position =
      (await prisma.tickets.count({
        where: {
          serviceId: service.id,
          status: "WAITING",
        },
      })) + 1;

    const ticket = await prisma.tickets.create({
      data: {
        userId: user.id,
        serviceId: service.id,
        status: "WAITING",
        position: position,
      },
      include: {
        service: {
          select: {
            name: true,
            description: true,
            estimatedTime: true,
          },
        },
      },
    });
    console.log(position)
    await prisma.tickets.update({
      where: { id: ticket.id },
      data: {},
    });

    res.json({
      success: true,
      ticket: { ...ticket, position },
      message: "Successfully joined the queue",
    });
  } catch (error) {
    console.error("Error joining queue:", error);
    res.status(500).json({
      success: false,
      message: "Failed to join queue",
    });
  }
});

router.delete(
  "/api/queue/leave/:ticketId",
  requireStudent,
  async (req, res) => {
    try {
      const { ticketId } = req.params;
      const studentCode = req.user.studentCode;

      const user = await prisma.user.findUnique({
        where: { studentCode: studentCode },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const ticket = await prisma.tickets.findFirst({
        where: {
          id: ticketId,
          userId: user.id,
          status: { in: ["WAITING", "CALLED", "IN_PROGRESS"] },
        },
      });

      if (!ticket) {
        return res.status(400).json({
          success: false,
          message: "No active ticket found",
        });
      }

      await prisma.tickets.update({
        where: { id: ticket.id },
        data: {
          status: "CANCELLED",
          updatedAt: new Date(),
        },
      });

      res.json({
        success: true,
        message: "Successfully left the queue",
      });
    } catch (error) {
      console.error("Error leaving queue:", error);
      res.status(500).json({
        success: false,
        message: "Failed to leave queue",
      });
    }
  }
);

router.get("/api/queue/current", async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      include: {
        tickets: {
          where: {
            status: { in: ["WAITING", "CALLED", "IN_PROGRESS"] },
          },
          include: {
            user: {
              select: {
                studentCode: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    const currentQueue = services.map((service) => ({
      service: {
        id: service.id,
        name: service.name,
        description: service.description,
        estimatedTime: service.estimatedTime,
      },
      tickets: service.tickets.map((ticket, index) => ({
        id: ticket.id,
        position: index + 1,
        status: ticket.status,
        student: ticket.user,
        waitTime: Math.floor((new Date() - ticket.createdAt) / 1000 / 60),
        createdAt: ticket.createdAt,
      })),
    }));

    res.json({
      success: true,
      queue: currentQueue,
    });
  } catch (error) {
    console.error("Error fetching current queue:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch current queue",
    });
  }
});

router.get("/api/queue/status/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;

    const service = await prisma.service.findFirst({
      where: {
        OR: [{ id: serviceId }, { name: serviceId }],
        isActive: true,
      },
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    const queueCount = await prisma.tickets.count({
      where: {
        serviceId: service.id,
        status: "WAITING",
      },
    });

    const inProgressCount = await prisma.tickets.count({
      where: {
        serviceId: service.id,
        status: "IN_PROGRESS",
      },
    });

    res.json({
      success: true,
      status: {
        waiting: queueCount,
        inProgress: inProgressCount,
        total: queueCount + inProgressCount,
      },
    });
  } catch (error) {
    console.error("Error fetching queue status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch queue status",
    });
  }
});

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

module.exports = router;
