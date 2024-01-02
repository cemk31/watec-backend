/*
  Warnings:

  - You are about to drop the column `auftraggeber` on the `auftraggeber` table. All the data in the column will be lost.
  - Added the required column `auftraggebername` to the `auftraggeber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auftraggeber" DROP COLUMN "auftraggeber",
ADD COLUMN     "auftraggebername" TEXT NOT NULL;
