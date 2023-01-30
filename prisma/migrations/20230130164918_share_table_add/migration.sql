-- CreateTable
CREATE TABLE "ShareRequests" (
    "id" SERIAL NOT NULL,
    "listId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "pending" BOOLEAN NOT NULL,
    "accepted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "ShareRequests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShareRequests" ADD CONSTRAINT "ShareRequests_listId_fkey" FOREIGN KEY ("listId") REFERENCES "Lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShareRequests" ADD CONSTRAINT "ShareRequests_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShareRequests" ADD CONSTRAINT "ShareRequests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
