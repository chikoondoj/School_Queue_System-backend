const crypto = require('crypto');

class Helpers {
  // Generate unique ticket number
  static generateTicketNumber(serviceType) {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    const servicePrefix = serviceType.charAt(0).toUpperCase();
    
    return `${servicePrefix}${timestamp}${random}`.toUpperCase();
  }

  // Generate unique student code (for registration)
  static generateStudentCode(year, course) {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const coursePrefix = course.charAt(0).toUpperCase();
    const random = Math.random().toString().slice(2, 6);
    
    return `${currentYear}${coursePrefix}${random}`;
  }

  // Validate email format
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate student code format
  static isValidStudentCode(code) {
    // Adjust regex based on your institution's format
    const codeRegex = /^[A-Z0-9]{6,10}$/;
    return codeRegex.test(code);
  }

  // Sanitize input to prevent XSS
  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // Format date for display
  static formatDate(date, format = 'datetime') {
    const d = new Date(date);
    
    if (isNaN(d.getTime())) return 'Invalid Date';
    
    const options = {
      date: { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      },
      time: { 
        hour: '2-digit', 
        minute: '2-digit' 
      },
      datetime: { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
      }
    };
    
    return d.toLocaleDateString('en-US', options[format] || options.datetime);
  }

  // Calculate time difference in human readable format
  static getTimeAgo(date) {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    
    if (diffMs < 0) return 'in the future';
    
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSeconds < 60) return 'just now';
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return this.formatDate(date, 'date');
  }

  // Generate secure random string
  static generateSecureRandom(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  // Hash sensitive data (not passwords - use bcrypt for passwords)
  static hashData(data, secret = process.env.HASH_SECRET || 'default-secret') {
    return crypto.createHmac('sha256', secret).update(data).digest('hex');
  }

  // Paginate results
  static paginate(array, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const totalItems = array.length;
    const totalPages = Math.ceil(totalItems / limit);
    const items = array.slice(offset, offset + limit);
    
    return {
      items,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }

  // Validate required fields
  static validateRequiredFields(data, requiredFields) {
    const missing = [];
    
    for (const field of requiredFields) {
      if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
        missing.push(field);
      }
    }
    
    return {
      isValid: missing.length === 0,
      missingFields: missing
    };
  }

  // Generate API response format
  static apiResponse(success, data = null, message = '', errors = []) {
    return {
      success,
      message,
      data,
      errors: errors.length > 0 ? errors : undefined,
      timestamp: new Date().toISOString()
    };
  }

  // Success response helper
  static successResponse(data, message = 'Success') {
    return this.apiResponse(true, data, message);
  }

  // Error response helper
  static errorResponse(message = 'Error', errors = []) {
    return this.apiResponse(false, null, message, errors);
  }

  // Deep clone object
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (typeof obj === 'object') {
      const cloned = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          cloned[key] = this.deepClone(obj[key]);
        }
      }
      return cloned;
    }
  }

  // Retry function with exponential backoff
  static async retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        console.log(`Retry attempt ${attempt} failed, retrying in ${delay}ms...`);
      }
    }
  }

  // Format phone number
  static formatPhoneNumber(phone) {
    if (!phone) return '';
    
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Format based on length
    if (digits.length === 10) {
      return `(${digits.substr(0, 3)}) ${digits.substr(3, 3)}-${digits.substr(6, 4)}`;
    } else if (digits.length === 11 && digits[0] === '1') {
      return `+1 (${digits.substr(1, 3)}) ${digits.substr(4, 3)}-${digits.substr(7, 4)}`;
    }
    
    return phone; // Return original if can't format
  }

  // Generate QR code data for ticket
  static generateQRCodeData(ticket) {
    const qrData = {
      ticketId: ticket.id,
      studentCode: ticket.student_code,
      service: ticket.service_type,
      position: ticket.position,
      timestamp: ticket.created_at
    };
    
    return JSON.stringify(qrData);
  }

  // Calculate business hours wait time (excluding weekends and after hours)
  static calculateBusinessHoursWaitTime(minutes) {
    const businessHoursPerDay = 8; // 8 hours per business day
    const businessMinutesPerDay = businessHoursPerDay * 60;
    
    if (minutes <= businessMinutesPerDay) {
      return {
        days: 0,
        hours: Math.floor(minutes / 60),
        minutes: minutes % 60,
        formatted: this.formatMinutes(minutes)
      };
    }
    
    const businessDays = Math.floor(minutes / businessMinutesPerDay);
    const remainingMinutes = minutes % businessMinutesPerDay;
    const remainingHours = Math.floor(remainingMinutes / 60);
    const finalMinutes = remainingMinutes % 60;
    
    return {
      days: businessDays,
      hours: remainingHours,
      minutes: finalMinutes,
      formatted: `${businessDays} business day${businessDays > 1 ? 's' : ''} ${remainingHours}h ${finalMinutes}m`
    };
  }

  // Format minutes to readable string
  static formatMinutes(minutes) {
    if (minutes < 1) return 'Less than 1 minute';
    if (minutes < 60) return `${Math.round(minutes)} minute${Math.round(minutes) !== 1 ? 's' : ''}`;
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    
    if (remainingMinutes === 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }
    
    return `${hours} hour${hours !== 1 ? 's' : ''} ${remainingMinutes} minute${remainingMinutes !== 1 ? 's' : ''}`;
  }

  // Get current academic year
  static getCurrentAcademicYear() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-based
    
    // Academic year typically starts in August/September
    if (currentMonth >= 7) { // August or later
      return `${currentYear}-${currentYear + 1}`;
    } else {
      return `${currentYear - 1}-${currentYear}`;
    }
  }

  // Validate and format course code
  static formatCourseCode(courseCode) {
    if (!courseCode) return '';
    
    // Remove spaces and convert to uppercase
    const formatted = courseCode.replace(/\s+/g, '').toUpperCase();
    
    // Basic validation - adjust regex based on your institution's format
    const courseRegex = /^[A-Z]{2,4}[0-9]{3,4}$/;
    
    return courseRegex.test(formatted) ? formatted : courseCode;
  }

  // Get queue position suffix (1st, 2nd, 3rd, etc.)
  static getPositionSuffix(position) {
    const lastDigit = position % 10;
    const lastTwoDigits = position % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
      return `${position}th`;
    }
    
    switch (lastDigit) {
      case 1: return `${position}st`;
      case 2: return `${position}nd`;
      case 3: return `${position}rd`;
      default: return `${position}th`;
    }
  }

  // Log request for debugging/auditing
  static logRequest(req, additionalInfo = {}) {
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      user: req.user ? {
        id: req.user.id,
        studentCode: req.user.studentCode,
        role: req.user.role
      } : null,
      ...additionalInfo
    };
    
    console.log('Request Log:', JSON.stringify(logData, null, 2));
    
    return logData;
  }

  // Rate limiting key generator
  static generateRateLimitKey(req, identifier = 'ip') {
    switch (identifier) {
      case 'user':
        return req.user ? `user:${req.user.id}` : `ip:${req.ip}`;
      case 'studentCode':
        return req.user ? `student:${req.user.studentCode}` : `ip:${req.ip}`;
      default:
        return `ip:${req.ip}`;
    }
  }
}

module.exports = Helpers;