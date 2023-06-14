/*
  Warnings:

  - You are about to drop the column `auftraggeberId` on the `adresse_sst` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adresseId]` on the table `auftraggeber` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adresseId` to the `auftraggeber` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "adresse_sst" DROP CONSTRAINT "adresse_sst_auftraggeberId_fkey";

-- AlterTable
ALTER TABLE "adresse_sst" DROP COLUMN "auftraggeberId";

-- AlterTable
ALTER TABLE "auftraggeber" ADD COLUMN     "adresseId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "auftraggeber_adresseId_key" ON "auftraggeber"("adresseId");

-- AddForeignKey
ALTER TABLE "auftraggeber" ADD CONSTRAINT "auftraggeber_adresseId_fkey" FOREIGN KEY ("adresseId") REFERENCES "adresse_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
