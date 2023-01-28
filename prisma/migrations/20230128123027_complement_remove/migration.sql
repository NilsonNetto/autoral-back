/*
  Warnings:

  - You are about to drop the column `complement` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `complement` on the `lists` table. All the data in the column will be lost.
  - You are about to drop the column `complement` on the `locals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "complement";

-- AlterTable
ALTER TABLE "lists" DROP COLUMN "complement";

-- AlterTable
ALTER TABLE "locals" DROP COLUMN "complement";
