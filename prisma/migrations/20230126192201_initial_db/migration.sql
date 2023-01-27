-- CreateEnum
CREATE TYPE "itemStatus" AS ENUM ('chek', 'uncheck');

-- CreateEnum
CREATE TYPE "listStatus" AS ENUM ('open', 'finished', 'deleted');

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lists" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255),
    "status" "listStatus" NOT NULL DEFAULT 'open',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listsLocalsItems" (
    "id" SERIAL NOT NULL,
    "listLocalsId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "status" "itemStatus" NOT NULL DEFAULT 'uncheck',
    "quantity" INTEGER,
    "unit" INTEGER,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "listsLocalsItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "listsLocals" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "localId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "listsLocals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locals" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "locals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usersLists" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "listId" INTEGER NOT NULL,
    "owner" BOOLEAN NOT NULL,
    "shared" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "usersLists_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "listsLocalsItems" ADD CONSTRAINT "listsLocalsItems_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listsLocalsItems" ADD CONSTRAINT "listsLocalsItems_listLocalsId_fkey" FOREIGN KEY ("listLocalsId") REFERENCES "listsLocals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listsLocals" ADD CONSTRAINT "listsLocals_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "listsLocals" ADD CONSTRAINT "listsLocals_localId_fkey" FOREIGN KEY ("localId") REFERENCES "locals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usersLists" ADD CONSTRAINT "usersLists_listId_fkey" FOREIGN KEY ("listId") REFERENCES "lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "usersLists" ADD CONSTRAINT "usersLists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
