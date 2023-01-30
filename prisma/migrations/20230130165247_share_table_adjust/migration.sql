-- AlterTable
ALTER TABLE "ShareRequests" ALTER COLUMN "pending" SET DEFAULT true,
ALTER COLUMN "accepted" DROP NOT NULL;
