/*
  Warnings:

  - You are about to drop the `ContactPerson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auftraege` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[contactPersonId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_contactPersonId_fkey";

-- DropForeignKey
ALTER TABLE "auftraege" DROP CONSTRAINT "auftraege_auftraggeberId_fkey";

-- DropForeignKey
ALTER TABLE "auftraege" DROP CONSTRAINT "auftraege_emailId_fkey";

-- DropForeignKey
ALTER TABLE "auftraege" DROP CONSTRAINT "auftraege_objektId_fkey";

-- DropForeignKey
ALTER TABLE "auftraege" DROP CONSTRAINT "auftraege_userId_fkey";

-- DropForeignKey
ALTER TABLE "auftraege" DROP CONSTRAINT "auftraege_vwDynamischId_fkey";

-- DropForeignKey
ALTER TABLE "auftraege" DROP CONSTRAINT "auftraege_vwStatischId_fkey";

-- DropForeignKey
ALTER TABLE "auftragsbestaetigung" DROP CONSTRAINT "auftragsbestaetigung_auftragId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "contactPersonId" INTEGER;

-- DropTable
DROP TABLE "ContactPerson";

-- DropTable
DROP TABLE "auftraege";

-- CreateTable
CREATE TABLE "contactPerson" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "forename" TEXT,
    "telephone" TEXT,
    "telephoneMobile" TEXT,
    "role" TEXT,
    "customerId" INTEGER,

    CONSTRAINT "contactPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auftrag" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN,
    "emailEingang" TIMESTAMP(3),
    "bemerkung" TEXT,
    "vorgemerkt" TEXT,
    "hmName" TEXT,
    "hmTel" TEXT,
    "userId" INTEGER NOT NULL,
    "auftraggeberId" INTEGER,
    "emailId" INTEGER,
    "objektId" INTEGER,
    "vwDynamischId" INTEGER,
    "vwStatischId" INTEGER,
    "mail" TEXT,

    CONSTRAINT "auftrag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contactPerson_customerId_key" ON "contactPerson"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "auftrag_emailId_key" ON "auftrag"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "auftrag_objektId_key" ON "auftrag"("objektId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_contactPersonId_key" ON "Customer"("contactPersonId");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "contactPerson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftrag" ADD CONSTRAINT "auftrag_auftraggeberId_fkey" FOREIGN KEY ("auftraggeberId") REFERENCES "auftraggeber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftrag" ADD CONSTRAINT "auftrag_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "email"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftrag" ADD CONSTRAINT "auftrag_objektId_fkey" FOREIGN KEY ("objektId") REFERENCES "objekt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftrag" ADD CONSTRAINT "auftrag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftrag" ADD CONSTRAINT "auftrag_vwDynamischId_fkey" FOREIGN KEY ("vwDynamischId") REFERENCES "vw"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftrag" ADD CONSTRAINT "auftrag_vwStatischId_fkey" FOREIGN KEY ("vwStatischId") REFERENCES "vw"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftragsbestaetigung" ADD CONSTRAINT "auftragsbestaetigung_auftragId_fkey" FOREIGN KEY ("auftragId") REFERENCES "auftrag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "contactPerson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
