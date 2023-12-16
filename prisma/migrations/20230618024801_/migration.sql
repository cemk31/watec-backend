-- DropForeignKey
ALTER TABLE "ClosedContractPartner" DROP CONSTRAINT "ClosedContractPartner_customerContactId_fkey";

-- AlterTable
ALTER TABLE "ClosedContractPartner" ALTER COLUMN "customerContactId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ClosedContractPartner" ADD CONSTRAINT "ClosedContractPartner_customerContactId_fkey" FOREIGN KEY ("customerContactId") REFERENCES "CustomerContact"("id") ON DELETE SET NULL ON UPDATE CASCADE;
