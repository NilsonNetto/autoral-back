/*
  Warnings:

  - You are about to drop the column `status` on the `listsLocalsItems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "listsLocalsItems" DROP COLUMN "status",
ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "itemStatus";
