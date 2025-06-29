const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Models = require("../models");

class AuthService {
  constructor() {
    this.JWT_SECRET =
      process.env.JWT_SECRET || "your-secret-key-change-in-production";
    this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
    this.REFRESH_TOKEN_EXPIRES_IN =
      process.env.REFRESH_TOKEN_EXPIRES_IN || "30d";
    this.MAX_LOGIN_ATTEMPTS = 5;
    this.LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes
    this.PASSWORD_RESET_EXPIRES = 60 * 60 * 1000; // 1 hour

    this.tokenBlacklist = new Set();
    this.loginAttempts = new Map();
  }

  async hashPassword(password) {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  generateToken(user, type = "access") {
    const payload = {
      id: user.id,
      studentCode: user.student_code,
      role: user.role,
      studentName: user.student_name,
      type,
    };

    const expiresIn =
      type === "refresh" ? this.REFRESH_TOKEN_EXPIRES_IN : this.JWT_EXPIRES_IN;

    return jwt.sign(payload, this.JWT_SECRET, { expiresIn });
  }

  generateRefreshToken(user) {
    return this.generateToken(user, "refresh");
  }

  verifyToken(token) {
    try {
      if (this.tokenBlacklist.has(token)) {
        throw new Error("Token has been revoked");
      }

      return jwt.verify(token, this.JWT_SECRET);
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  }

  generatePasswordResetToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  generateEmailVerificationToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  async register(userData) {
    const {
      studentCode,
      password,
      studentName,
      course,
      year,
      email,
      phoneNumber,
    } = userData;

    const existingUser = await Models.getUserByStudentCode(studentCode);
    if (existingUser) {
      throw new Error("Student code already exists");
    }

    if (email) {
      const existingEmail = await Models.getUserByEmail(email);
      if (existingEmail) {
        throw new Error("Email already registered");
      }
    }

    if (!studentCode || !password || !studentName || !course || !year) {
      throw new Error("All required fields must be provided");
    }

    const validationErrors = this.validateRegistrationData(userData);
    if (validationErrors.length > 0) {
      throw new Error(`Validation errors: ${validationErrors.join(", ")}`);
    }

    const hashedPassword = await this.hashPassword(password);
    const emailVerificationToken = email
      ? this.generateEmailVerificationToken()
      : null;

    const newUser = await Models.createUser({
      studentCode,
      password: hashedPassword,
      studentName,
      course,
      year,
      email,
      phoneNumber,
      role: "student",
      emailVerificationToken,
      emailVerified: !email,
      registrationDate: new Date(),
      lastLogin: null,
      isActive: true,
    });

    const accessToken = this.generateToken(newUser);
    const refreshToken = this.generateRefreshToken(newUser);

    await Models.saveRefreshToken(newUser.id, refreshToken);

    const {
      password: _,
      emailVerificationToken: __,
      ...userWithoutSensitive
    } = newUser;

    return {
      user: userWithoutSensitive,
      accessToken,
      refreshToken,
      requiresEmailVerification: !!email && !newUser.emailVerified,
    };
  }

  async login(studentCode, password, ipAddress = null, userAgent = null) {
    if (!studentCode || !password) {
      throw new Error("Student code and password are required");
    }

    const attemptKey = `${studentCode}_${ipAddress}`;
    const attempts = this.loginAttempts.get(attemptKey) || {
      count: 0,
      lastAttempt: 0,
    };

    if (attempts.count >= this.MAX_LOGIN_ATTEMPTS) {
      const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
      if (timeSinceLastAttempt < this.LOCKOUT_TIME) {
        const remainingTime = Math.ceil(
          (this.LOCKOUT_TIME - timeSinceLastAttempt) / (1000 * 60)
        );
        throw new Error(
          `Account temporarily locked. Try again in ${remainingTime} minutes`
        );
      } else {
        this.loginAttempts.delete(attemptKey);
      }
    }

    const user = await Models.getUserByStudentCode(studentCode);
    if (!user) {
      this.recordFailedAttempt(attemptKey);
      throw new Error("Invalid student code or password");
    }

    if (!user.isActive) {
      throw new Error("Account is deactivated. Please contact administration");
    }

    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      this.recordFailedAttempt(attemptKey);
      throw new Error("Invalid student code or password");
    }

    this.loginAttempts.delete(attemptKey);

    const accessToken = this.generateToken(user);
    const refreshToken = this.generateRefreshToken(user);

    await Models.saveRefreshToken(user.id, refreshToken);
    await Models.updateLastLogin(user.id, ipAddress, userAgent);

    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
      requiresPasswordChange: this.shouldRequirePasswordChange(user),
      loginHistory: await Models.getRecentLogins(user.id, 5),
    };
  }

  async refreshToken(refreshToken) {
    try {
      const decoded = this.verifyToken(refreshToken);

      if (decoded.type !== "refresh") {
        throw new Error("Invalid token type");
      }

      const storedToken = await Models.getRefreshToken(
        decoded.id,
        refreshToken
      );
      if (!storedToken) {
        throw new Error("Refresh token not found or expired");
      }

      const user = await Models.getUserById(decoded.id);
      if (!user || !user.isActive) {
        throw new Error("User not found or deactivated");
      }

      const newAccessToken = this.generateToken(user);
      const newRefreshToken = this.generateRefreshToken(user);

      await Models.replaceRefreshToken(
        decoded.id,
        refreshToken,
        newRefreshToken
      );

      const { password: _, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  async registerAdmin(userData) {
    const { studentCode, password, studentName, email, department } = userData;

    const existingUser = await Models.getUserByStudentCode(studentCode);
    if (existingUser) {
      throw new Error("Admin code already exists");
    }

    if (!this.validateAdminRegistration(userData)) {
      throw new Error("Invalid admin registration data");
    }

    const hashedPassword = await this.hashPassword(password);

    const newAdmin = await Models.createUser({
      studentCode,
      password: hashedPassword,
      studentName,
      email,
      course: "Administration",
      year: "Staff",
      role: "admin",
      department,
      emailVerified: true,
      isActive: true,
      registrationDate: new Date(),
    });

    const accessToken = this.generateToken(newAdmin);
    const refreshToken = this.generateRefreshToken(newAdmin);

    await Models.saveRefreshToken(newAdmin.id, refreshToken);

    const { password: _, ...adminWithoutPassword } = newAdmin;

    return {
      user: adminWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async requestPasswordReset(studentCode, email = null) {
    const user = await Models.getUserByStudentCode(studentCode);
    if (!user) {
      return {
        message: "If the user exists, a password reset email will be sent",
      };
    }

    if (email && user.email !== email) {
      return {
        message: "If the user exists, a password reset email will be sent",
      };
    }

    const resetToken = this.generatePasswordResetToken();
    const resetExpires = new Date(Date.now() + this.PASSWORD_RESET_EXPIRES);

    await Models.savePasswordResetToken(user.id, resetToken, resetExpires);

    return {
      message: "Password reset instructions sent",
      resetToken: resetToken,
      userId: user.id,
    };
  }

  async resetPassword(resetToken, newPassword) {
    const resetData = await Models.getPasswordResetToken(resetToken);
    if (!resetData || resetData.expires < new Date()) {
      throw new Error("Invalid or expired reset token");
    }

    const validationErrors = this.validatePassword(newPassword);
    if (validationErrors.length > 0) {
      throw new Error(
        `Password validation errors: ${validationErrors.join(", ")}`
      );
    }

    const hashedPassword = await this.hashPassword(newPassword);

    await Models.updateUserPassword(resetData.userId, hashedPassword);
    await Models.deletePasswordResetToken(resetToken);
    await Models.revokeAllRefreshTokens(resetData.userId);

    return { message: "Password reset successfully" };
  }

  async verifyEmail(verificationToken) {
    const user = await Models.getUserByEmailVerificationToken(
      verificationToken
    );
    if (!user) {
      throw new Error("Invalid verification token");
    }

    await Models.verifyUserEmail(user.id);

    return { message: "Email verified successfully" };
  }

  async resendEmailVerification(userId) {
    const user = await Models.getUserById(userId);
    if (!user || user.emailVerified) {
      throw new Error("User not found or email already verified");
    }

    const newVerificationToken = this.generateEmailVerificationToken();
    await Models.updateEmailVerificationToken(userId, newVerificationToken);

    return {
      message: "Verification email sent",
      verificationToken: newVerificationToken,
    };
  }

  authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    try {
      const decoded = this.verifyToken(token);
      if (decoded.type !== "access") {
        return res.status(403).json({ error: "Invalid token type" });
      }

      req.user = decoded;
      req.token = token;
      next();
    } catch (error) {
      return res.status(403).json({ error: error.message });
    }
  }

  requireAdmin(req, res, next) {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }
    next();
  }

  requireStudent(req, res, next) {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Student access required" });
    }
    next();
  }

  requireVerifiedEmail(req, res, next) {
    if (!req.user.emailVerified) {
      return res.status(403).json({
        error: "Email verification required",
        requiresVerification: true,
      });
    }
    next();
  }

  optionalAuth(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      try {
        const decoded = this.verifyToken(token);
        req.user = decoded;
        req.token = token;
      } catch (error) {
        // Continue without authentication
      }
    }

    next();
  }

  async getProfile(userId) {
    const user = await Models.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const profile = await Models.getUserProfile(userId);
    const loginHistory = await Models.getRecentLogins(userId, 10);
    const activeTokens = await Models.getActiveRefreshTokens(userId);

    const {
      password: _,
      emailVerificationToken: __,
      ...userWithoutSensitive
    } = user;

    return {
      ...userWithoutSensitive,
      profile,
      loginHistory,
      activeTokensCount: activeTokens.length,
      accountStats: {
        lastLogin: user.lastLogin,
        registrationDate: user.registrationDate,
        emailVerified: user.emailVerified,
      },
    };
  }

  async updateProfile(userId, updates) {
    const allowedUpdates = [
      "studentName",
      "course",
      "year",
      "email",
      "phoneNumber",
      "preferences",
    ];
    const filteredUpdates = {};

    for (const key of allowedUpdates) {
      if (updates[key] !== undefined) {
        filteredUpdates[key] = updates[key];
      }
    }

    if (Object.keys(filteredUpdates).length === 0) {
      throw new Error("No valid fields to update");
    }

    if (filteredUpdates.email) {
      const existingEmail = await Models.getUserByEmail(filteredUpdates.email);
      if (existingEmail && existingEmail.id !== userId) {
        throw new Error("Email already in use");
      }

      filteredUpdates.emailVerified = false;
      filteredUpdates.emailVerificationToken =
        this.generateEmailVerificationToken();
    }

    const updatedUser = await Models.updateUser(userId, filteredUpdates);
    const { password: _, ...userWithoutPassword } = updatedUser;

    return {
      user: userWithoutPassword,
      requiresEmailVerification: !!filteredUpdates.email,
    };
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await Models.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isCurrentPasswordValid = await this.comparePassword(
      currentPassword,
      user.password
    );
    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    const validationErrors = this.validatePassword(newPassword);
    if (validationErrors.length > 0) {
      throw new Error(
        `Password validation errors: ${validationErrors.join(", ")}`
      );
    }

    const hashedNewPassword = await this.hashPassword(newPassword);

    await Models.updateUser(userId, {
      password: hashedNewPassword,
      passwordChangedAt: new Date(),
    });

    await Models.revokeAllRefreshTokens(userId);

    return { message: "Password changed successfully" };
  }

  async logout(token, userId = null) {
    this.tokenBlacklist.add(token);

    if (userId) {
      const decoded = this.verifyToken(token);
      if (decoded.type === "refresh") {
        await Models.revokeRefreshToken(userId, token);
      }
    }

    setTimeout(() => {
      this.tokenBlacklist.delete(token);
    }, 7 * 24 * 60 * 60 * 1000); // Remove from blacklist after 7 days

    return { message: "Logged out successfully" };
  }

  async logoutAllDevices(userId) {
    await Models.revokeAllRefreshTokens(userId);

    return { message: "Logged out from all devices" };
  }

  async getActiveTokens(userId) {
    const activeTokens = await Models.getActiveRefreshTokens(userId);

    return activeTokens.map((token) => ({
      id: token.id,
      createdAt: token.created_at,
      lastUsed: token.last_used,
      ipAddress: token.ip_address,
      userAgent: token.user_agent,
      isCurrent: token.token === req.refreshToken,
    }));
  }

  async revokeToken(userId, tokenId) {
    const revoked = await Models.revokeRefreshTokenById(userId, tokenId);
    if (!revoked) {
      throw new Error("Token not found or already revoked");
    }

    return { message: "Token revoked successfully" };
  }

  async validateSession(token) {
    try {
      const decoded = this.verifyToken(token);
      const user = await Models.getUserById(decoded.id);

      if (!user || !user.isActive) {
        throw new Error("Invalid session");
      }

      return {
        valid: true,
        user: {
          id: user.id,
          studentCode: user.student_code,
          role: user.role,
          studentName: user.student_name,
        },
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message,
      };
    }
  }

  recordFailedAttempt(attemptKey) {
    const attempts = this.loginAttempts.get(attemptKey) || {
      count: 0,
      lastAttempt: 0,
    };
    attempts.count += 1;
    attempts.lastAttempt = Date.now();
    this.loginAttempts.set(attemptKey, attempts);
  }

  shouldRequirePasswordChange(user) {
    if (!user.passwordChangedAt) return true;

    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    return new Date(user.passwordChangedAt) < ninetyDaysAgo;
  }

  validateRegistrationData(userData) {
    const errors = [];

    if (!this.validateStudentCode(userData.studentCode)) {
      errors.push("Invalid student code format");
    }

    const passwordErrors = this.validatePassword(userData.password);
    errors.push(...passwordErrors);

    if (userData.email && !this.validateEmail(userData.email)) {
      errors.push("Invalid email format");
    }

    if (
      userData.phoneNumber &&
      !this.validatePhoneNumber(userData.phoneNumber)
    ) {
      errors.push("Invalid phone number format");
    }

    return errors;
  }

  validateAdminRegistration(userData) {
    return (
      userData.studentCode &&
      userData.password &&
      userData.studentName &&
      userData.email &&
      this.validateEmail(userData.email)
    );
  }

  validateStudentCode(studentCode) {
    const studentCodeRegex = /^[A-Z0-9]{6,10}$/;
    return studentCodeRegex.test(studentCode);
  }

  validatePassword(password) {
    const errors = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }

    if (!/(?=.*[a-z])/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }

    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/(?=.*\d)/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/(?=.*[@$!%*?&])/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    return errors;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phoneNumber);
  }

  async getSecurityEvents(userId, limit = 20) {
    return await Models.getSecurityEvents(userId, limit);
  }

  async logSecurityEvent(userId, eventType, details = {}) {
    await Models.logSecurityEvent(userId, eventType, details);
  }

  async enableTwoFactor(userId) {
    const secret = crypto.randomBytes(32).toString("hex");
    await Models.updateUser(userId, {
      twoFactorSecret: secret,
      twoFactorEnabled: false,
    });

    return {
      secret,
      qrCode: this.generateTwoFactorQR(userId, secret),
    };
  }

  async verifyTwoFactor(userId, token) {
    const user = await Models.getUserById(userId);
    if (!user || !user.twoFactorSecret) {
      throw new Error("Two-factor authentication not set up");
    }

    // In production, use proper TOTP library like 'speakeasy'
    const isValid = this.verifyTOTP(token, user.twoFactorSecret);

    if (isValid && !user.twoFactorEnabled) {
      await Models.updateUser(userId, { twoFactorEnabled: true });
    }

    return { valid: isValid, enabled: user.twoFactorEnabled };
  }

  generateTwoFactorQR(userId, secret) {
    // In production, use proper QR code generation
    return `otpauth://totp/QueueSystem:${userId}?secret=${secret}&issuer=QueueSystem`;
  }

  verifyTOTP(token, secret) {
    // Simplified TOTP verification - use proper library in production
    return token.length === 6 && /^\d+$/.test(token);
  }
}

module.exports = new AuthService();
