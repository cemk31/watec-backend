/*
  Warnings:

  - You are about to drop the column `adresseId` on the `auftraggeber` table. All the data in the column will be lost.
  - You are about to drop the column `kundennummer` on the `auftraggeber` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `auftraggeber` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ap` to the `auftraggeber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `auftraggeber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ort` to the `auftraggeber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plz` to the `auftraggeber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `strasse` to the `auftraggeber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tel` to the `auftraggeber` table without a default value. This is not possible if the table is not empty.
  - Made the column `auftraggeber` on table `auftraggeber` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "auftraggeber" DROP CONSTRAINT "auftraggeber_adresseId_fkey";

-- DropIndex
DROP INDEX "auftraggeber_adresseId_key";

-- AlterTable
ALTER TABLE "auftraggeber" DROP COLUMN "adresseId",
DROP COLUMN "kundennummer",
ADD COLUMN     "ap" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "ort" TEXT NOT NULL,
ADD COLUMN     "plz" INTEGER NOT NULL,
ADD COLUMN     "strasse" TEXT NOT NULL,
ADD COLUMN     "tel" TEXT NOT NULL,
ALTER COLUMN "auftraggeber" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "auftraggeber_email_key" ON "auftraggeber"("email");
