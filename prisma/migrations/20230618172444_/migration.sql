/*
  Warnings:

  - Added the required column `closedContractPartnerId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClosedContractPartner" DROP CONSTRAINT "ClosedContractPartner_orderId_fkey";

-- AlterTable
ALTER TABLE "ClosedContractPartner" ALTER COLUMN "orderId" DROP NOT NULL,
ALTER COLUMN "orderstatusType" DROP NOT NULL,
ALTER COLUMN "setOn" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "closedContractPartnerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderStatus" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "type" DROP NOT NULL,
ALTER COLUMN "setOn" DROP NOT NULL,
ALTER COLUMN "executionOnSiteDone" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ClosedContractPartner" ADD CONSTRAINT "ClosedContractPartner_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_closedContractPartnerId_fkey" FOREIGN KEY ("closedContractPartnerId") REFERENCES "ClosedContractPartner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
