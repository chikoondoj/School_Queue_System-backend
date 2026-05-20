ALTER TABLE "services" ALTER COLUMN "estimatedTime" SET DEFAULT 5;

UPDATE "services"
SET "estimatedTime" = 5
WHERE "estimatedTime" IS DISTINCT FROM 5;
