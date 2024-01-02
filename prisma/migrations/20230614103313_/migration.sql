/*
  Warnings:

  - You are about to drop the `Auftraggeber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Auftraggeber" DROP CONSTRAINT "Auftraggeber_userId_fkey";

-- DropForeignKey
ALTER TABLE "adresse_sst" DROP CONSTRAINT "adresse_sst_auftraggeberId_fkey";

-- DropTable
DROP TABLE "Auftraggeber";

-- CreateTable
CREATE TABLE "auftraggeber" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "kundennummer" TEXT,
    "auftraggeber" TEXT,

    CONSTRAINT "auftraggeber_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adresse_sst" ADD CONSTRAINT "adresse_sst_auftraggeberId_fkey" FOREIGN KEY ("auftraggeberId") REFERENCES "auftraggeber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftraggeber" ADD CONSTRAINT "auftraggeber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
