/*
  Warnings:

  - You are about to drop the column `vsDynamischId` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `vsStatischId` on the `auftraege` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "auftraege" DROP CONSTRAINT "auftraege_vsDynamischId_fkey";

-- DropForeignKey
ALTER TABLE "auftraege" DROP CONSTRAINT "auftraege_vsStatischId_fkey";

-- AlterTable
ALTER TABLE "auftraege" DROP COLUMN "vsDynamischId",
DROP COLUMN "vsStatischId",
ADD COLUMN     "vwDynamischId" INTEGER,
ADD COLUMN     "vwStatischId" INTEGER;

-- AddForeignKey
ALTER TABLE "auftraege" ADD CONSTRAINT "auftraege_vwStatischId_fkey" FOREIGN KEY ("vwStatischId") REFERENCES "vw"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftraege" ADD CONSTRAINT "auftraege_vwDynamischId_fkey" FOREIGN KEY ("vwDynamischId") REFERENCES "vw"("id") ON DELETE SET NULL ON UPDATE CASCADE;
