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

const validateLogin = (req, res, next) => {
  const { studentCode, email, password } = req.body;
  const errors = [];

  if (!studentCode || studentCode.trim() === "")
    //  && (!email || email.trim() === "")) 
  {
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

module.exports = {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
  validateJoinQueue,
  validateAdminRegister,
  validateAdminLogin,
};
