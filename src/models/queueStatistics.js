// src/models/QueueStatistics.js
const { prisma } = require("../utils/database");
const { PrismaClient } = require("@prisma/client");

class QueueStatistics {
  // Create or update queue statistics for a service

  static async upsert(serviceId, data) {
    try {
      // Check if statistics record exists for this service
      const serviceIdStr =
        typeof serviceId === "object"
          ? JSON.stringify(serviceId)
          : String(serviceId);
      const existing = await prisma.$queryRaw`
      SELECT * FROM queue_statistics WHERE "serviceId" = ${serviceIdStr} LIMIT 1
    `;

      const statsData = {
        serviceId,
        currentQueueLength: data?.currentQueueLength || 0,
        estimatedWaitTime: data?.estimatedWaitTime || 0,
        averageServiceTime: data?.averageServiceTime || 0,
        isActive: data?.isActive !== undefined ? data.isActive : true,
        lastUpdated: new Date(),
        dailyTicketCount: data?.dailyTicketCount || 0,
        weeklyTicketCount: data?.weeklyTicketCount || 0,
        monthlyTicketCount: data?.monthlyTicketCount || 0,
      };

      if (existing.length > 0) {
        // Update existing record
        const result = await prisma.$executeRaw`
        UPDATE queue_statistics 
        SET 
          "currentQueueLength" = ${statsData.currentQueueLength},
          "estimatedWaitTime" = ${statsData.estimatedWaitTime},
          "averageServiceTime" = ${statsData.averageServiceTime},
          "isActive" = ${statsData.isActive},
          "lastUpdated" = ${statsData.lastUpdated},
          "dailyTicketCount" = ${statsData.dailyTicketCount},
          "weeklyTicketCount" = ${statsData.weeklyTicketCount},
          "monthlyTicketCount" = ${statsData.monthlyTicketCount},
          "updatedAt" = ${new Date()}
        WHERE "serviceId" = ${serviceId}
      `;
        return result;
      } else {
        // Create new record
        console.log("serviceId:", serviceId);
        if (!serviceId) throw new Error("serviceId is undefined!");
        const result = await prisma.$executeRaw`
        INSERT INTO queue_statistics (
          "serviceId", "currentQueueLength", "estimatedWaitTime", 
          "averageServiceTime", "isActive", "lastUpdated", 
          "dailyTicketCount", "weeklyTicketCount", "monthlyTicketCount",
          "createdAt", "updatedAt"
        ) VALUES (
          ${serviceId}, ${statsData.currentQueueLength}, ${
          statsData.estimatedWaitTime
        },
          ${statsData.averageServiceTime}, ${statsData.isActive}, ${
          statsData.lastUpdated
        },
          ${statsData.dailyTicketCount}, ${statsData.weeklyTicketCount}, ${
          statsData.monthlyTicketCount
        },
          ${new Date()}, ${new Date()}
        )
      `;
        return result;
      }
    } catch (error) {
      console.error("Error upserting queue statistics:", error);
      throw error;
    }
  }

  // Find statistics by service ID
  static async findByServiceId(serviceId) {
    try {
      const result = await prisma.$queryRaw`
        SELECT * FROM queue_statistics WHERE "serviceId" = ${serviceId} LIMIT 1
      `;
      return result[0] || null;
    } catch (error) {
      console.error("Error finding queue statistics by service ID:", error);
      throw error;
    }
  }

  // Get all active queue statistics
  static async findAllActive() {
    try {
      const result = await prisma.$queryRaw`
        SELECT 
          qs.*,
          s.name as service_name,
          s.description as service_description
        FROM queue_statistics qs
        JOIN services s ON qs."serviceId" = s.id
        WHERE qs."isActive" = true
        ORDER BY s.name
      `;
      return result;
    } catch (error) {
      console.error("Error finding all active queue statistics:", error);
      throw error;
    }
  }

  

  // Update average service time for a service
  static async updateAverageServiceTime(serviceId) {
    try {
      const result = await prisma.$queryRaw`
        SELECT 
          AVG(EXTRACT(EPOCH FROM ("completedAt" - "calledAt")) / 60) as avg_time
        FROM tickets 
        WHERE "serviceId" = ${serviceId} 
          AND status = 'COMPLETED' 
          AND "calledAt" IS NOT NULL 
          AND "completedAt" IS NOT NULL
      `;

      const averageServiceTime = parseFloat(result[0]?.avg_time || 0);

      await this.upsert(serviceId, { averageServiceTime });
      return averageServiceTime;
    } catch (error) {
      console.error("Error updating average service time:", error);
      throw error;
    }
  }

  // Update daily ticket count
  static async updateDailyCount(serviceId) {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const result = await prisma.$queryRaw`
        SELECT COUNT(*) as count
        FROM tickets 
        WHERE "serviceId" = ${serviceId} 
          AND "createdAt" >= ${today}
      `;

      const dailyTicketCount = parseInt(result[0]?.count || 0);
      await this.upsert(serviceId, { dailyTicketCount });
      return dailyTicketCount;
    } catch (error) {
      console.error("Error updating daily count:", error);
      throw error;
    }
  }

  // Refresh all statistics for a service
  static async refreshStats(serviceId) {
    try {
      const [queueLength, avgServiceTime, dailyCount] = await Promise.all([
        this.updateQueueLength(serviceId),
        this.updateAverageServiceTime(serviceId),
        this.updateDailyCount(serviceId),
      ]);

      return {
        serviceId,
        currentQueueLength: queueLength.currentQueueLength,
        estimatedWaitTime: queueLength.estimatedWaitTime,
        averageServiceTime: avgServiceTime,
        dailyTicketCount: dailyCount,
        lastUpdated: new Date(),
      };
    } catch (error) {
      console.error("Error refreshing stats:", error);
      throw error;
    }
  }

  // Get statistics summary for dashboard
  static async getSummary() {
    try {
      const result = await prisma.$queryRaw`
        SELECT 
          COUNT(*) as total_services,
          SUM("currentQueueLength") as total_waiting,
          AVG("averageServiceTime") as overall_avg_service_time,
          SUM("dailyTicketCount") as total_daily_tickets
        FROM queue_statistics 
        WHERE "isActive" = true
      `;

      return (
        result[0] || {
          total_services: 0,
          total_waiting: 0,
          overall_avg_service_time: 0,
          total_daily_tickets: 0,
        }
      );
    } catch (error) {
      console.error("Error getting statistics summary:", error);
      throw error;
    }
  }
}

module.exports = QueueStatistics;
