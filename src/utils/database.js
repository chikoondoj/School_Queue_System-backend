const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class Database {
  constructor() {
    this.pool = null;
    this.init();
  }

  // Initialize database connection pool
  async init() {
    try {
      // Create PostgreSQL connection pool
      this.pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl:
          process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : false,
      });

      // Test the connection
      const client = await this.pool.connect();
      console.log("Connected to PostgreSQL database");
      client.release();

      // Create tables
      await this.createTables();

      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Database initialization error:", error);
      throw error;
    }
  }

  // Create all necessary tables
  async createTables() {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      // Users table - Updated to match Prisma schema
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          "studentCode" VARCHAR(50) UNIQUE NOT NULL,
          password TEXT NOT NULL,
          name VARCHAR(255) NOT NULL,
          course VARCHAR(255),
          year INTEGER,
          email VARCHAR(255),
          role VARCHAR(50) DEFAULT 'STUDENT',
          "isActive" BOOLEAN DEFAULT TRUE,
          "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Services table - Updated to match Prisma schema
      await client.query(`
        CREATE TABLE IF NOT EXISTS services (
          id TEXT PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description TEXT,
          "estimatedTime" INTEGER,
          "isActive" BOOLEAN DEFAULT TRUE,
          "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Tickets table - CHANGED TO MATCH PRISMA SCHEMA (queue_tickets)
      await client.query(`
        CREATE TABLE IF NOT EXISTS queue_tickets (
          id TEXT PRIMARY KEY,
          position INTEGER NOT NULL,
          status VARCHAR(20) DEFAULT 'WAITING' CHECK(status IN ('WAITING', 'CALLED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
          "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "calledAt" TIMESTAMP,
          "completedAt" TIMESTAMP,
          "userId" TEXT NOT NULL,
          "serviceId" TEXT NOT NULL,
          CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE,
          CONSTRAINT fk_service FOREIGN KEY ("serviceId") REFERENCES services(id) ON DELETE CASCADE
        )
      `);

      // Activities table - Added to match Prisma schema
      await client.query(`
        CREATE TABLE IF NOT EXISTS activities (
          id TEXT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          type VARCHAR(50) NOT NULL CHECK(type IN ('ASSIGNMENT', 'QUIZ', 'LECTURE', 'LAB', 'PROJECT', 'EXAM', 'WORKSHOP', 'SEMINAR', 'TUTORIAL', 'FIELDWORK')),
          status VARCHAR(50) DEFAULT 'ACTIVE' CHECK(status IN ('ACTIVE', 'INACTIVE', 'COMPLETED', 'CANCELLED', 'PENDING', 'OVERDUE')),
          "startDate" TIMESTAMP,
          "endDate" TIMESTAMP,
          "userId" TEXT,
          metadata JSONB,
          "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_activity_user FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE SET NULL
        )
      `);

      // Activity logs table - UPDATED TO REFERENCE queue_tickets
      await client.query(`
        CREATE TABLE IF NOT EXISTS activity_logs (
          id TEXT PRIMARY KEY,
          "userId" TEXT,
          "ticketId" TEXT,
          "serviceId" TEXT,
          action VARCHAR(255) NOT NULL,
          details TEXT,
          "ipAddress" VARCHAR(45),
          "userAgent" TEXT,
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_activity_user FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE SET NULL,
          CONSTRAINT fk_activity_ticket FOREIGN KEY ("ticketId") REFERENCES queue_tickets(id) ON DELETE SET NULL,
          CONSTRAINT fk_activity_service FOREIGN KEY ("serviceId") REFERENCES services(id) ON DELETE SET NULL
        )
      `);

      // Create indexes for activity logs
      await client.query(
        'CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs("userId")'
      );
      await client.query(
        'CREATE INDEX IF NOT EXISTS idx_activity_logs_ticket_id ON activity_logs("ticketId")'
      );
      await client.query(
        'CREATE INDEX IF NOT EXISTS idx_activity_logs_service_id ON activity_logs("serviceId")'
      );
      await client.query(
        "CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp)"
      );

      // Queue statistics table
      await client.query(`
        CREATE TABLE IF NOT EXISTS queue_statistics (
          id SERIAL PRIMARY KEY,
          "serviceId" TEXT NOT NULL,
          "currentQueueLength" INTEGER DEFAULT 0,
          "estimatedWaitTime" INTEGER DEFAULT 0,
          "averageServiceTime" FLOAT DEFAULT 0,
          "isActive" BOOLEAN DEFAULT TRUE,
          "lastUpdated" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "dailyTicketCount" INTEGER DEFAULT 0,
          "weeklyTicketCount" INTEGER DEFAULT 0,
          "monthlyTicketCount" INTEGER DEFAULT 0,
          "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_queue_stats_service FOREIGN KEY ("serviceId") REFERENCES services(id) ON DELETE CASCADE,
          CONSTRAINT unique_service_stats UNIQUE ("serviceId")
        )
      `);

      // Create index for queue statistics
      await client.query(
        'CREATE INDEX IF NOT EXISTS idx_queue_statistics_service_id ON queue_statistics("serviceId")'
      );

      // Create trigger for auto-updating updatedAt column
      await client.query(`
        DROP TRIGGER IF EXISTS set_timestamp_queue_statistics ON queue_statistics;
        CREATE TRIGGER set_timestamp_queue_statistics
        BEFORE UPDATE ON queue_statistics
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();
      `);

      // Create indexes for better performance
      await client.query(
        'CREATE INDEX IF NOT EXISTS idx_users_student_code ON users("studentCode")'
      );
      await client.query(
        "CREATE INDEX IF NOT EXISTS idx_services_name ON services(name)"
      );
      await client.query(
        'CREATE INDEX IF NOT EXISTS idx_queue_tickets_user_id ON queue_tickets("userId")'
      );
      await client.query(
        'CREATE INDEX IF NOT EXISTS idx_queue_tickets_service_id ON queue_tickets("serviceId")'
      );
      await client.query(
        "CREATE INDEX IF NOT EXISTS idx_queue_tickets_status ON queue_tickets(status)"
      );
      await client.query(
        'CREATE INDEX IF NOT EXISTS idx_queue_tickets_created_at ON queue_tickets("createdAt")'
      );
      await client.query(
        'CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities("userId")'
      );
      await client.query(
        "CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(type)"
      );
      await client.query(
        "CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status)"
      );
      await client.query(
        'CREATE INDEX IF NOT EXISTS idx_activities_created_at ON activities("createdAt")'
      );

      // Create a view for active tickets - UPDATED TO USE queue_tickets
      await client.query(`
        CREATE OR REPLACE VIEW active_tickets_view AS
        SELECT 
          t.*,
          u.name as user_name,
          u."studentCode",
          u.course,
          u.year,
          s.name as service_name,
          s.description as service_description
        FROM queue_tickets t
        JOIN users u ON t."userId" = u.id
        JOIN services s ON t."serviceId" = s.id
        WHERE t.status IN ('WAITING', 'CALLED', 'IN_PROGRESS')
      `);

      // Create trigger function for updating updatedAt timestamp
      await client.query(`
        CREATE OR REPLACE FUNCTION trigger_set_timestamp()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW."updatedAt" = NOW();
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `);

      // Create triggers for auto-updating updatedAt columns
      await client.query(`
        DROP TRIGGER IF EXISTS set_timestamp_users ON users;
        CREATE TRIGGER set_timestamp_users
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();
      `);

      await client.query(`
        DROP TRIGGER IF EXISTS set_timestamp_services ON services;
        CREATE TRIGGER set_timestamp_services
        BEFORE UPDATE ON services
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();
      `);

      await client.query(`
        DROP TRIGGER IF EXISTS set_timestamp_queue_tickets ON queue_tickets;
        CREATE TRIGGER set_timestamp_queue_tickets
        BEFORE UPDATE ON queue_tickets
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();
      `);

      await client.query(`
        DROP TRIGGER IF EXISTS set_timestamp_activities ON activities;
        CREATE TRIGGER set_timestamp_activities
        BEFORE UPDATE ON activities
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();
      `);

      await client.query("COMMIT");
      console.log("Database tables created successfully");
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error creating tables:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Execute a query with parameters
  async query(sql, params = []) {
    try {
      const result = await this.pool.query(sql, params);
      return result;
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }

  // Get a single row
  async get(sql, params = []) {
    try {
      const result = await this.pool.query(sql, params);
      return result.rows[0] || null;
    } catch (error) {
      console.error("Database get error:", error);
      throw error;
    }
  }

  // Get all rows
  async all(sql, params = []) {
    try {
      const result = await this.pool.query(sql, params);
      return result.rows;
    } catch (error) {
      console.error("Database all error:", error);
      throw error;
    }
  }

  // Execute multiple queries in transaction
  async transaction(queries) {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      const results = [];
      for (const queryObj of queries) {
        const result = await client.query(queryObj.sql, queryObj.params);
        results.push(result);
      }

      await client.query("COMMIT");
      return results;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  // Generate a CUID-like ID (simplified version)
  generateId() {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 15);
    return `${timestamp}${randomPart}`;
  }

  // Seed initial data (for development/testing)
  async seedData() {
    try {
      // Check if we already have users
      const userCount = await this.get("SELECT COUNT(*) as count FROM users");
      if (parseInt(userCount.count) > 0) {
        console.log("Database already has data, skipping seed");
        return;
      }

      console.log("Seeding initial data...");

      // Create default services
      const services = [
        {
          name: "Admission",
          description: "Student admission and enrollment services",
          estimatedTime: 15,
        },
        {
          name: "Registration",
          description: "Course registration and scheduling",
          estimatedTime: 10,
        },
        {
          name: "Financial Aid",
          description: "Financial assistance and student loans",
          estimatedTime: 20,
        },
        {
          name: "Counseling",
          description: "Academic and personal counseling services",
          estimatedTime: 30,
        },
      ];

      const serviceIds = [];
      for (const service of services) {
        const serviceId = this.generateId();
        serviceIds.push(serviceId);
        await this.query(
          `
          INSERT INTO services (id, name, description, "estimatedTime")
          VALUES ($1, $2, $3, $4)
        `,
          [serviceId, service.name, service.description, service.estimatedTime]
        );
      }

      //Test students
      const bcrypt = require("bcryptjs");
      const studentPassword = await bcrypt.hash("student123", 12);

      const testStudents = [
        ["STU001", "John Doe", "Computer Science", 1],
        ["STU002", "Jane Smith", "Business Administration", 2],
        ["STU003", "Mike Johnson", "Engineering", 3],
        ["STU004", "Sarah Williams", "Arts", 1],
        ["STU005", "David Brown", "Science", 2],
      ];

      const userIds = [];
      for (const [code, name, course, year] of testStudents) {
        const userId = this.generateId();
        userIds.push(userId);
        await this.query(
          `
    INSERT INTO users (id, "studentCode", password, name, course, year, "isActive")
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `,
          [userId, code, studentPassword, name, course, year, true]
        ); // Add true for isActive
      }

      console.log("Initial data seeded successfully");
      console.log("Test students: STU001-STU005 / student123");
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  }

  // Database maintenance functions
  async vacuum() {
    return this.query("VACUUM");
  }

  async analyze() {
    return this.query("ANALYZE");
  }

  // Backup database (PostgreSQL specific)
  async backup(backupPath) {
    const { spawn } = require("child_process");

    return new Promise((resolve, reject) => {
      const pgDump = spawn("pg_dump", [
        "-h",
        process.env.DB_HOST || "localhost",
        "-p",
        process.env.DB_PORT || "5432",
        "-U",
        process.env.DB_USER || "postgres",
        "-d",
        process.env.DB_NAME || "school_queue_db",
        "-f",
        backupPath,
        "--no-password",
      ]);

      pgDump.on("close", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`pg_dump process exited with code ${code}`));
        }
      });

      pgDump.on("error", (err) => {
        reject(err);
      });
    });
  }

  // Close database connection pool
  async close() {
    try {
      await this.pool.end();
      console.log("Database connection pool closed");
    } catch (error) {
      console.error("Error closing database pool:", error);
      throw error;
    }
  }

  // Health check
  async healthCheck() {
    try {
      const result = await this.get("SELECT 1 as health");
      return result && result.health === 1;
    } catch (error) {
      console.error("Database health check failed:", error);
      return false;
    }
  }

  // Add this method to your Database class
  async addIsActiveColumn() {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      // Add the isActive column with default value TRUE
      await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT TRUE
    `);

      // Update all existing users to be active
      await client.query(`
      UPDATE users 
      SET "isActive" = TRUE 
      WHERE "isActive" IS NULL
    `);

      await client.query("COMMIT");
      console.log("Successfully added isActive column to users table");
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Error adding isActive column:", error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Get database statistics - UPDATED TO USE queue_tickets
  async getStats() {
    try {
      const stats = {};

      // Total users
      const userStats = await this.get(`
  SELECT 
    COUNT(*) as total_users,
    SUM(CASE WHEN "isActive" = true THEN 1 ELSE 0 END) as active_users,
    SUM(CASE WHEN "isActive" = false THEN 1 ELSE 0 END) as inactive_users
  FROM users
`);

      // Service statistics
      const serviceStats = await this.get(`
        SELECT 
          COUNT(*) as total_services,
          SUM(CASE WHEN "isActive" = true THEN 1 ELSE 0 END) as active_services
        FROM services
      `);

      // Ticket statistics - UPDATED TO USE queue_tickets
      const ticketStats = await this.get(`
        SELECT 
          COUNT(*) as total_tickets,
          SUM(CASE WHEN status = 'WAITING' THEN 1 ELSE 0 END) as waiting_tickets,
          SUM(CASE WHEN status = 'CALLED' THEN 1 ELSE 0 END) as called_tickets,
          SUM(CASE WHEN status = 'IN_PROGRESS' THEN 1 ELSE 0 END) as in_progress_tickets,
          SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as completed_tickets,
          SUM(CASE WHEN status = 'CANCELLED' THEN 1 ELSE 0 END) as cancelled_tickets
        FROM queue_tickets
      `);

      // Service usage statistics - UPDATED TO USE queue_tickets
      const serviceUsageStats = await this.all(`
        SELECT 
          s.name as service_name,
          COUNT(t.id) as total_requests,
          AVG(CASE 
            WHEN t."completedAt" IS NOT NULL AND t."calledAt" IS NOT NULL 
            THEN EXTRACT(EPOCH FROM (t."completedAt" - t."calledAt")) / 60
          END) as avg_service_time_minutes
        FROM services s
        LEFT JOIN queue_tickets t ON s.id = t."serviceId"
        WHERE t.status = 'COMPLETED'
        GROUP BY s.id, s.name
      `);

      return {
        users: userStats,
        services: serviceStats,
        tickets: ticketStats,
        serviceUsage: serviceUsageStats,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error getting database stats:", error);
      return null;
    }
  }

  // Get connection pool status
  getPoolStatus() {
    return {
      totalCount: this.pool.totalCount,
      idleCount: this.pool.idleCount,
      waitingCount: this.pool.waitingCount,
    };
  }
}

// Create singleton instance
const database = new Database();

module.exports = { database, prisma };
