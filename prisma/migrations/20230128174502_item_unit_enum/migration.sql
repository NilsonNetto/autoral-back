/*
  Warnings:

  - The values [chek] on the enum `itemStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `unit` column on the `listsLocalsItems` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "itemUnit" AS ENUM ('kgs', 'un');

-- AlterEnum
BEGIN;
CREATE TYPE "itemStatus_new" AS ENUM ('check', 'uncheck');
ALTER TABLE "listsLocalsItems" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "listsLocalsItems" ALTER COLUMN "status" TYPE "itemStatus_new" USING ("status"::text::"itemStatus_new");
ALTER TYPE "itemStatus" RENAME TO "itemStatus_old";
ALTER TYPE "itemStatus_new" RENAME TO "itemStatus";
DROP TYPE "itemStatus_old";
ALTER TABLE "listsLocalsItems" ALTER COLUMN "status" SET DEFAULT 'uncheck';
COMMIT;

-- AlterTable
ALTER TABLE "listsLocalsItems" DROP COLUMN "unit",
ADD COLUMN     "unit" "itemUnit" NOT NULL DEFAULT 'un';
