/*
  Warnings:

  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tickets` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[adminCode]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('ASSIGNMENT', 'QUIZ', 'LECTURE', 'LAB', 'PROJECT', 'EXAM', 'WORKSHOP', 'SEMINAR', 'TUTORIAL', 'FIELDWORK');

-- CreateEnum
CREATE TYPE "ActivityStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'COMPLETED', 'CANCELLED', 'PENDING', 'OVERDUE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'ADMIN', 'SUPER_ADMIN');

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_userId_fkey";

-- DropIndex
DROP INDEX "services_name_key";

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "estimatedTime" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "adminCode" TEXT,
ADD COLUMN     "isActive" BOOLEAN DEFAULT true,
ALTER COLUMN "course" DROP NOT NULL,
ALTER COLUMN "year" DROP NOT NULL,
ALTER COLUMN "studentCode" DROP NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "tickets";

-- CreateTable
CREATE TABLE "queue_tickets" (
    "id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'WAITING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "calledAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "isNew" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "queue_tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "ActivityType" NOT NULL,
    "status" "ActivityStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "userId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "ticketId" TEXT,
    "serviceId" TEXT,
    "action" VARCHAR(255) NOT NULL,
    "details" TEXT,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "timestamp" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "queue_statistics" (
    "id" SERIAL NOT NULL,
    "serviceId" TEXT NOT NULL,
    "currentQueueLength" INTEGER DEFAULT 0,
    "estimatedWaitTime" INTEGER DEFAULT 0,
    "averageServiceTime" DOUBLE PRECISION DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "lastUpdated" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "dailyTicketCount" INTEGER DEFAULT 0,
    "weeklyTicketCount" INTEGER DEFAULT 0,
    "monthlyTicketCount" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "queue_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_tickets_created_at" ON "queue_tickets"("createdAt");

-- CreateIndex
CREATE INDEX "idx_tickets_service_id" ON "queue_tickets"("serviceId");

-- CreateIndex
CREATE INDEX "idx_tickets_status" ON "queue_tickets"("status");

-- CreateIndex
CREATE INDEX "idx_tickets_user_id" ON "queue_tickets"("userId");

-- CreateIndex
CREATE INDEX "idx_queue_tickets_created_at" ON "queue_tickets"("createdAt");

-- CreateIndex
CREATE INDEX "idx_queue_tickets_service_id" ON "queue_tickets"("serviceId");

-- CreateIndex
CREATE INDEX "idx_queue_tickets_status" ON "queue_tickets"("status");

-- CreateIndex
CREATE INDEX "idx_queue_tickets_user_id" ON "queue_tickets"("userId");

-- CreateIndex
CREATE INDEX "idx_activities_user_id" ON "activities"("userId");

-- CreateIndex
CREATE INDEX "idx_activities_type" ON "activities"("type");

-- CreateIndex
CREATE INDEX "idx_activities_status" ON "activities"("status");

-- CreateIndex
CREATE INDEX "idx_activities_created_at" ON "activities"("createdAt");

-- CreateIndex
CREATE INDEX "idx_activity_logs_service_id" ON "activity_logs"("serviceId");

-- CreateIndex
CREATE INDEX "idx_activity_logs_ticket_id" ON "activity_logs"("ticketId");

-- CreateIndex
CREATE INDEX "idx_activity_logs_timestamp" ON "activity_logs"("timestamp");

-- CreateIndex
CREATE INDEX "idx_activity_logs_user_id" ON "activity_logs"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "unique_service_stats" ON "queue_statistics"("serviceId");

-- CreateIndex
CREATE INDEX "idx_queue_statistics_service_id" ON "queue_statistics"("serviceId");

-- CreateIndex
CREATE INDEX "idx_services_name" ON "services"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_adminCode_key" ON "users"("adminCode");

-- CreateIndex
CREATE INDEX "idx_users_student_code" ON "users"("studentCode");

-- AddForeignKey
ALTER TABLE "queue_tickets" ADD CONSTRAINT "queue_tickets_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queue_tickets" ADD CONSTRAINT "queue_tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "fk_activity_service" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "fk_activity_ticket" FOREIGN KEY ("ticketId") REFERENCES "queue_tickets"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "activity_logs" ADD CONSTRAINT "fk_activity_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "queue_statistics" ADD CONSTRAINT "fk_queue_stats_service" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
