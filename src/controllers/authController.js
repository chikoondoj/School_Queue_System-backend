const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const ActivityService = require("../services/activityService");

class AuthController {
  // Student Registration
  async register(req, res) {
    try {
      console.log("=== REGISTRATION START ===");
      console.log("Request method:", req.method);
      console.log("Request URL:", req.url);
      console.log("Request headers:", req.headers);
      console.log("Raw request body:", req.body);

      const { name, course, year, password, email, phone } =
        req.body;

      console.log("Extracted fields:", {
        studentCode,
        name,
        course,
        year,
        password: password ? "***" : "MISSING",
        email,
        phone,
      });

      // Validate required fields
      if (!name || !course || !year || !password) {
        console.log("Validation failed - missing required fields");
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
          received: {
            // studentCode: !!studentCode,
            name: !!name,
            course: !!course,
            year: !!year,
            password: !!password,
          },
        });
      }
      
      //Generate next studentCode
      const lastUser = await prisma.user.findFirst({
        orderBy: { id: "desc" },
        select: { studentCode: true },
      });

      let studentCode;
      if (lastUser && lastUser.studentCode) {
        const num = parseInt(lastUser.studentCode.replace("STU", ""), 10);
        studentCode = "STU" + String(num + 1).padStart(3, "0");
      } else {
        studentCode = "STU001";
      }

      console.log("Generated studentCode:", studentCode);

      //Hash Password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Password hashed successfully");

      const userData = {
        studentCode,
        name,
        course,
        year: parseInt(year),
        password: hashedPassword,
        email: email || null,
        role: "STUDENT",
      };

      console.log("About to create user with data:", {
        ...userData
      });

      // Check Prisma connection
      await prisma.$connect();
      console.log("Prisma connected successfully");

      const user = await prisma.user.create({
        data: userData,
      });

      console.log("User created successfully:", {
        id: user.id,
        studentCode: user.studentCode,
      });

      // Verify the user was actually saved by querying it back
      const savedUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: {
          id: true,
          studentCode: true,
          name: true,
          course: true,
          year: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      console.log("Verification - User found in database:", savedUser);

      //Check total user count
      const totalUsers = await prisma.user.count();
      console.log("Total users in database:", totalUsers);

      console.log("=== REGISTRATION SUCCESS ===");

      res.status(201).json({
        success: true,
        message: "Student registered successfully",
        userId: user.id,
      });
    } catch (error) {
      console.log("=== REGISTRATION ERROR ===");
      console.error("Registration error details:", {
        name: error.name,
        message: error.message,
        code: error.code,
        meta: error.meta,
        stack: error.stack,
      });

      // Check if it's a Prisma-specific error
      if (error.code === "P2002") {
        return res.status(400).json({
          success: false,
          message: "A user with this student code already exists",
        });
      }

      if (error.code === "P2025") {
        return res.status(400).json({
          success: false,
          message: "Database record not found",
        });
      }

      res.status(500).json({
        success: false,
        message: "Registration failed",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal server error",
      });
    }
  }
  async adminRegister(req, res) {
    try {
      const { name, email, password } = req.body;
      console.log("=== ADMIN REGISTRATION START ===", { name, email });

      // 1. Validate required fields (should be already validated by middleware)
      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      // 2. Check if email is already registered as an admin
      const existingAdmin = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email },
            // Optionally: { name: name }
          ],
          role: "ADMIN",
        },
      });

      if (existingAdmin) {
        return res.status(400).json({
          success: false,
          message: "An admin with this email already exists.",
        });
      }

      // 3. Generate unique admin code: ADM{YEAR}{SEQ}
      const year = new Date().getFullYear();
      const lastAdmin = await prisma.user.findFirst({
        where: { role: "ADMIN", adminCode: { not: null } },
        orderBy: { createdAt: "desc" },
      });

      let seq = 1;
      if (lastAdmin && lastAdmin.adminCode) {
        const match = lastAdmin.adminCode.match(/ADM\d{4}(\d+)/);
        if (match) seq = parseInt(match[1], 10) + 1;
      }
      const adminCode = `ADM${year}${String(seq).padStart(3, "0")}`;

      // 4. Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 5. Create admin user
      const admin = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "ADMIN",
          adminCode,
          isActive: true,
        },
      });

      // 6. Return success and show admin code
      res.status(201).json({
        success: true,
        message: "Admin registered successfully",
        adminCode,
        userId: admin.id,
      });
    } catch (error) {
      console.error("=== ADMIN REGISTRATION ERROR ===", error);
      if (error.code === "P2002") {
        // Unique constraint failed
        return res.status(400).json({
          success: false,
          message: "An admin with this email or code already exists",
        });
      }
      res.status(500).json({
        success: false,
        message: "Admin registration failed",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Student/Admin Login
  async login(req, res) {
    try {
      const { studentCode, password, isAdmin } = req.body;

      console.log("=== LOGIN ATTEMPT ===");
      console.log("Student Code:", studentCode);
      console.log("Is Admin:", isAdmin);
      console.log("Password provided:", !!password);

      if (!studentCode || !password) {
        console.log("Missing studentCode or password");
        return res.status(400).json({
          success: false,
          message: "Student code and password are required",
        });
      }

      // For admin login
      if (isAdmin === true) {
        console.log("Admin login attempt");
        if (
          studentCode === process.env.ADMIN_CODE &&
          password === process.env.ADMIN_PASSWORD
        ) {
          const token = jwt.sign(
            { id: "admin", role: "ADMIN", studentCode: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
          );

          return res.json({
            success: true,
            message: "Admin login successful",
            token, // Move token to top level
            user: {
              id: "admin",
              name: "Administrator",
              role: "ADMIN",
              studentCode: "admin",
              isAdmin: true,
            },
          });
        } else {
          console.log("Invalid admin credentials");
          return res.status(401).json({
            success: false,
            message: "Invalid admin credentials",
          });
        }
      }

      // For student login
      console.log("Looking for user with studentCode:", studentCode);
      const user = await prisma.user.findUnique({
        where: { studentCode },
      });

      console.log("User found:", !!user);
      if (user) {
        console.log("User details:", {
          id: user.id,
          studentCode: user.studentCode,
          name: user.name,
          role: user.role,
          isActive: user.isActive,
          hasPassword: !!user.password,
          isAdmin: user.role === "ADMIN", // Derive from role
        });
      }

      if (!user || !user.isActive) {
        console.log("User not found or not active");
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Check password
      console.log("Checking password...");
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Password valid:", isPasswordValid);

      if (!isPasswordValid) {
        console.log("Password comparison failed");
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
          studentCode: user.studentCode,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      req.session.user = {
        id: user.id,
        studentCode: user.studentCode,
        name: user.name,
        role: user.role,
        isAdmin: user.role === "ADMIN",
      };

      // Remove password from response and add isAdmin flag
      const { password: _, ...userWithoutPassword } = user;
      const userResponse = {
        ...userWithoutPassword,
        isAdmin: user.role === "ADMIN", // Derive isAdmin from role
      };

      console.log("Login successful for user:", user.studentCode);
      res.json({
        success: true,
        message: "Login successful",
        user: userResponse,
      });

      try {
        const logData = {
          userId: user.id,
          action: "LOGIN",
          details: {
            message: `Successful login from ${req.ip || "unknown IP"}`,
          },
          ipAddress: req.ip || null,
          userAgent: req.headers["user-agent"] || null,
        };

        const logResult = await ActivityService.logActivity(logData);

        if (!logResult.success) {
          console.error("Activity logging failed:", logResult.error);
        }
      } catch (activityError) {
        console.error(
          "Unexpected error during activity logging:",
          activityError
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        success: false,
        message: "Login failed",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Admin Login
  async adminLogin(req, res) {
    try {
      const { email, password } = req.body;

      console.log("=== ADMIN LOGIN ATTEMPT ===");
      console.log("Email:", email);

      // Find the admin by email and role
      const admin = await prisma.user.findFirst({
        where: {
          email: email,
          role: "ADMIN",
          isActive: true,
        },
      });

      if (!admin) {
        console.log("Admin not found or not active");
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        console.log("Admin password invalid");
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: admin.id,
          role: admin.role,
          adminCode: admin.adminCode,
          email: admin.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      req.session.user = {
        id: admin.id,
        adminCode: admin.adminCode,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        isAdmin: true,
      };

      // Remove password from response
      const { password: _, ...adminWithoutPassword } = admin;
      adminWithoutPassword.isAdmin = true;

      console.log("Admin login successful:", admin.email);

      res.json({
        success: true,
        message: "Admin login successful",
        token,
        user: adminWithoutPassword,
      });

      // Optional: log activity
      try {
        await ActivityService.logActivity(
          admin.id,
          "LOGIN",
          `Admin login from ${req.ip || "unknown IP"}`,
          { loginTime: new Date(), userAgent: req.headers["user-agent"] }
        );
      } catch (activityError) {
        console.error("Failed to log admin login activity:", activityError);
      }
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({
        success: false,
        message: "Login failed",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Get current user profile
  async getProfile(req, res) {
    try {
      if (req.user.id === "admin") {
        return res.json({
          success: true,
          data: {
            user: {
              id: "admin",
              name: "Administrator",
              role: "ADMIN",
              studentCode: "admin",
            },
          },
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          id: true,
          studentCode: true,
          name: true,
          course: true,
          year: true,
          role: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({
        success: true,
        data: { user },
      });
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get profile",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Update user profile
  async updateProfile(req, res) {
    try {
      const { name, course, year, email } = req.body;

      if (req.user.id === "admin") {
        return res.status(403).json({
          success: false,
          message: "Admin profile cannot be updated",
        });
      }

      const updatedUser = await prisma.user.update({
        where: { id: req.user.id },
        data: {
          ...(name && { name }),
          ...(course && { course }),
          ...(year && { year: parseInt(year) }),
          ...(email && { email }),
        },
        select: {
          id: true,
          studentCode: true,
          name: true,
          course: true,
          year: true,
          role: true,
          email: true,
          updatedAt: true,
        },
      });

      res.json({
        success: true,
        message: "Profile updated successfully",
        data: { user: updatedUser },
      });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update profile",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      // Admin cannot change password through this endpoint
      if (req.user.id === "admin") {
        return res.status(403).json({
          success: false,
          message: "Admin password cannot be changed through this endpoint",
        });
      }

      // Get current user
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      // Update password
      await prisma.user.update({
        where: { id: req.user.id },
        data: { password: hashedNewPassword },
      });

      res.json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      console.error("Change password error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to change password",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Get user activity history
  async getActivity(req, res) {
    try {
      const studentId = req.user.id;

      if (req.user.id === "admin") {
        return res.json({
          success: true,
          data: [],
        });
      }

      // Get recent activities (last 30 days)
      const activities = await prisma.activityLog.findMany({
        where: {
          userId: studentId,
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
          },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          action: true,
          description: true,
          createdAt: true,
          metadata: true,
        },
      });

      // Format activities for frontend
      const formattedActivities = activities.map((activity) => ({
        action: activity.action,
        description: activity.description,
        timestamp: activity.createdAt,
        metadata: activity.metadata,
      }));

      res.json({
        success: true,
        data: formattedActivities,
      });
    } catch (error) {
      console.error("Get activity error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to get activity history",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

  // Logout endpoint
  async logout(req, res) {
    try {
      // Destroy session
      req.session.destroy((err) => {
        if (err) {
          console.error("Session destruction error:", err);
          return res.status(500).json({
            success: false,
            message: "Logout failed",
          });
        }

        // Clear session cookie
        res.clearCookie("connect.sid");

        res.json({
          success: true,
          message: "Logged out successfully",
        });
      });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({
        success: false,
        message: "Logout failed",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }
}

module.exports = new AuthController();
