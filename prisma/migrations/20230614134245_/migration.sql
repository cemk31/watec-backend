/*
  Warnings:

  - You are about to drop the column `ap` on the `adresse_sst` table. All the data in the column will be lost.
  - Made the column `userId` on table `adresse_sst` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "adresse_sst" DROP CONSTRAINT "adresse_sst_userId_fkey";

-- AlterTable
ALTER TABLE "adresse_sst" DROP COLUMN "ap",
ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "adresse_sst" ADD CONSTRAINT "adresse_sst_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
