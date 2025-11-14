-- AlterTable
ALTER TABLE "queue_tickets" ADD COLUMN     "clerkId" TEXT;

-- AddForeignKey
ALTER TABLE "queue_tickets" ADD CONSTRAINT "queue_tickets_clerkId_fkey" FOREIGN KEY ("clerkId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
