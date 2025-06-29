const { database } = require('../utils/database');

class ActivityLog {
  static async create(data) {
    const id = database.generateId();
    const result = await database.query(`
      INSERT INTO activity_logs (
        id, "userId", "ticketId", "serviceId", action, details, 
        "ipAddress", "userAgent", timestamp
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING *
    `, [
      id,
      data.userId || null,
      data.ticketId || null,
      data.serviceId || null,
      data.action,
      data.details || null,
      data.ipAddress || null,
      data.userAgent || null,
      new Date()
    ]);
    return result.rows[0];
  }

  static async findAll(options = {}) {
    let query = 'SELECT * FROM activity_logs';
    let params = [];
    
    if (options.where) {
      const conditions = [];
      let paramIndex = 1;
      
      for (const [key, value] of Object.entries(options.where)) {
        conditions.push(`"${key}" = $${paramIndex}`);
        params.push(value);
        paramIndex++;
      }
      
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
    }
    
    query += ' ORDER BY timestamp DESC';
    
    if (options.limit) {
      query += ` LIMIT ${options.limit}`;
    }
    
    return await database.all(query, params);
  }

  static async findByPk(id) {
    return await database.get('SELECT * FROM activity_logs WHERE id = $1', [id]);
  }

  static async findOne(options = {}) {
    let query = 'SELECT * FROM activity_logs';
    let params = [];
    
    if (options.where) {
      const conditions = [];
      let paramIndex = 1;
      
      for (const [key, value] of Object.entries(options.where)) {
        conditions.push(`"${key}" = $${paramIndex}`);
        params.push(value);
        paramIndex++;
      }
      
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
    }
    
    query += ' ORDER BY timestamp DESC LIMIT 1';
    
    return await database.get(query, params);
  }

  static async destroy(options = {}) {
    if (options.where) {
      const conditions = [];
      let params = [];
      let paramIndex = 1;
      
      for (const [key, value] of Object.entries(options.where)) {
        conditions.push(`"${key}" = $${paramIndex}`);
        params.push(value);
        paramIndex++;
      }
      
      if (conditions.length > 0) {
        const query = 'DELETE FROM activity_logs WHERE ' + conditions.join(' AND ');
        return await database.query(query, params);
      }
    }
  }
}

module.exports = ActivityLog;