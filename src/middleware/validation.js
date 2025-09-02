const validateRegister = (req, res, next) => {
  const { name, course, year, password, email } = req.body;
  const errors = [];

  // Required field validation
  if (!name || name.trim() === "") {
    errors.push("Name is required");
  }

  if (!course || course.trim() === "") {
    errors.push("Course is required");
  }

  if (!year) {
    errors.push("Year is required");
  } else if (isNaN(year) || year < 1 || year > 6) {
    errors.push("Year must be a valid number between 1 and 6");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  // Optional email validation
  if (email && email.trim() !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please provide a valid email address");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

module.exports = validateRegister;


const validateAdminRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  // Required field validation
  if (!name || name.trim() === "") {
    errors.push("Name is required");
  }

  if (!email || email.trim() === "") {
    errors.push("Email is required");
  } else {
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please provide a valid email address");
    }
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

const isAdmin = async (req, res, next) => {
  try {
    // 1. Check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    // 2. Extract token
    const token = authHeader.split(' ')[1];

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }

    // 4. Fetch user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // 5. Check role
    if (user.role !== 'ADMIN') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied: Admins only' 
      });
    }

    // 6. Attach user info to request and proceed
    req.user = user;
    next();
  } catch (error) {
    console.error('isAdmin middleware error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Authentication failed', 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const validateLogin = (req, res, next) => {
  const { identifier, password } = req.body;
  const errors = [];

  if (!identifier || identifier.trim() === "") {
    errors.push("Email or student code is required");
  }

  if (!password || password.trim() === "") {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

const validateAdminLogin = (req, res, next) => {
  const { email, adminCode, password } = req.body;
  const errors = [];

  if ((!email || email.trim() === "") && (!adminCode || adminCode.trim() === "")) {
    errors.push("Email or Admin Code is required");
  }

  if (email && email.trim() !== "") {
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please provide a valid email address");
    }
  }

  if (!password || password.trim() === "") {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

const validateUpdateProfile = (req, res, next) => {
  const { name, course, year, email } = req.body;
  const errors = [];

  // At least one field should be provided for update
  if (!name && !course && !year && !email) {
    errors.push("At least one field must be provided for update");
  }

  // Validate individual fields if provided
  if (name !== undefined && name.trim() === "") {
    errors.push("Name cannot be empty");
  }

  if (course !== undefined && course.trim() === "") {
    errors.push("Course cannot be empty");
  }

  if (year !== undefined) {
    if (isNaN(year) || year < 1 || year > 6) {
      errors.push("Year must be a valid number between 1 and 6");
    }
  }

  if (email !== undefined && email.trim() !== "") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Please provide a valid email address");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

const validateChangePassword = (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const errors = [];

  if (!currentPassword || currentPassword.trim() === "") {
    errors.push("Current password is required");
  }

  if (!newPassword || newPassword.length < 6) {
    errors.push("New password must be at least 6 characters long");
  }

  // Optional: Check if confirmPassword is provided and matches
  if (confirmPassword !== undefined && confirmPassword !== newPassword) {
    errors.push("New password and confirmation password do not match");
  }

  // Ensure new password is different from current password
  if (currentPassword === newPassword) {
    errors.push("New password must be different from current password");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

const validateJoinQueue = (req, res, next) => {
  const { serviceType } = req.body;
  const errors = [];

  if (!serviceType) {
    errors.push("Service type is required");
  }

  // Validate service type against allowed services
  const validServices = [
    "registrar",
    "financial_aid",
    "student_affairs",
    "academic_advising",
    "library",
    "it_support",
  ];

  if (serviceType && !validServices.includes(serviceType)) {
    errors.push("Invalid service type");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};

const validateResetStudentPassword = (req, res, next) => {
  const { studentCode } = req.body;
  const errors = [];

  if (!studentCode || studentCode.trim() === "") {
    errors.push("Student code is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors,
    });
  }

  next();
};


module.exports = {
  validateRegister,
  validateLogin,
  isAdmin,
  validateUpdateProfile,
  validateChangePassword,
  validateJoinQueue,
  validateAdminRegister,
  validateAdminLogin,
  validateResetStudentPassword,
};
