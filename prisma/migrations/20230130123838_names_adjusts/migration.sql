/*
  Warnings:

  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `listsLocals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `listsLocalsItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usersLists` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ItemUnit" AS ENUM ('kgs', 'un');

-- DropForeignKey
ALTER TABLE "listsLocals" DROP CONSTRAINT "listsLocals_listId_fkey";

-- DropForeignKey
ALTER TABLE "listsLocals" DROP CONSTRAINT "listsLocals_localId_fkey";

-- DropForeignKey
ALTER TABLE "listsLocalsItems" DROP CONSTRAINT "listsLocalsItems_itemId_fkey";

-- DropForeignKey
ALTER TABLE "listsLocalsItems" DROP CONSTRAINT "listsLocalsItems_listLocalsId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "usersLists" DROP CONSTRAINT "usersLists_listId_fkey";

-- DropForeignKey
ALTER TABLE "usersLists" DROP CONSTRAINT "usersLists_userId_fkey";

-- DropTable
DROP TABLE "items";

-- DropTable
DROP TABLE "lists";

-- DropTable
DROP TABLE "listsLocals";

-- DropTable
DROP TABLE "listsLocalsItems";

-- DropTable
DROP TABLE "locals";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "usersLists";

-- DropEnum
DROP TYPE "itemUnit";

-- DropEnum
DROP TYPE "listStatus";

-- CreateTable
CREATE TABLE "ItemsName" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "ItemsName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lists" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "Lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Items" (
    "id" SERIAL NOT NULL,
    "listLocalsId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "quantity" INTEGER,
    "unit" "ItemUnit" NOT NULL DEFAULT 'un',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListsLocals" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "ListsLocals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocalsName" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "LocalsName_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersLists" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "listId" INTEGER NOT NULL,
    "owner" BOOLEAN NOT NULL,
    "shared" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "UsersLists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "ItemsName"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_listLocalsId_fkey" FOREIGN KEY ("listLocalsId") REFERENCES "ListsLocals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ListsLocals" ADD CONSTRAINT "ListsLocals_listId_fkey" FOREIGN KEY ("listId") REFERENCES "Lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ListsLocals" ADD CONSTRAINT "ListsLocals_localId_fkey" FOREIGN KEY ("localId") REFERENCES "LocalsName"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UsersLists" ADD CONSTRAINT "UsersLists_listId_fkey" FOREIGN KEY ("listId") REFERENCES "Lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UsersLists" ADD CONSTRAINT "UsersLists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
