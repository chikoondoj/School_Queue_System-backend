-- This is an empty migration.
ALTER TABLE "queue_tickets" ADD COLUMN "isNew" BOOLEAN DEFAULT true;
