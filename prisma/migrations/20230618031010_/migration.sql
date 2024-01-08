/*
  Warnings:

  - You are about to drop the column `customerContactId` on the `ClosedContractPartner` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClosedContractPartner" DROP CONSTRAINT "ClosedContractPartner_customerContactId_fkey";

-- AlterTable
ALTER TABLE "ClosedContractPartner" DROP COLUMN "customerContactId";

-- CreateTable
CREATE TABLE "_ClosedContractPartnerToCustomerContact" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClosedContractPartnerToCustomerContact_AB_unique" ON "_ClosedContractPartnerToCustomerContact"("A", "B");

-- CreateIndex
CREATE INDEX "_ClosedContractPartnerToCustomerContact_B_index" ON "_ClosedContractPartnerToCustomerContact"("B");

-- AddForeignKey
ALTER TABLE "_ClosedContractPartnerToCustomerContact" ADD CONSTRAINT "_ClosedContractPartnerToCustomerContact_A_fkey" FOREIGN KEY ("A") REFERENCES "ClosedContractPartner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClosedContractPartnerToCustomerContact" ADD CONSTRAINT "_ClosedContractPartnerToCustomerContact_B_fkey" FOREIGN KEY ("B") REFERENCES "CustomerContact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
