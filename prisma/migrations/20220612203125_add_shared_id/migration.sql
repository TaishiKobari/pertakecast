/*
  Warnings:

  - A unique constraint covering the columns `[sharedId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sharedId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_sharedId_key" ON "User"("sharedId");
