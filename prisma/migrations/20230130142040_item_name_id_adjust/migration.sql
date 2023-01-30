/*
  Warnings:

  - You are about to drop the column `itemId` on the `Items` table. All the data in the column will be lost.
  - Added the required column `itemNameId` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_itemId_fkey";

-- AlterTable
ALTER TABLE "Items" DROP COLUMN "itemId",
ADD COLUMN     "itemNameId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_itemNameId_fkey" FOREIGN KEY ("itemNameId") REFERENCES "ItemsName"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
