/*
  Warnings:

  - Made the column `createdAt` on table `Postponed` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Postponed` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Postponed" DROP CONSTRAINT "Postponed_requestId_fkey";

-- AlterTable
ALTER TABLE "Postponed" ALTER COLUMN "requestId" DROP NOT NULL,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Postponed" ADD CONSTRAINT "Postponed_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
