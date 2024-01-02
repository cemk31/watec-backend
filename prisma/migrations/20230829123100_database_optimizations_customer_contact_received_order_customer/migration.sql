-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_cancelledId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_closedContractPartnerId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_notPossibleId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_postponedId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_rejectedId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerContact" DROP CONSTRAINT "CustomerContact_orderId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerContact" DROP CONSTRAINT "CustomerContact_statusReportId_fkey";

-- DropForeignKey
ALTER TABLE "DrinkingWaterHeater" DROP CONSTRAINT "DrinkingWaterHeater_drinkingWaterFacilityId_fkey";

-- DropForeignKey
ALTER TABLE "DrinkingWaterHeater" DROP CONSTRAINT "DrinkingWaterHeater_unitId_fkey";

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "receivedId" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "agentCP" DROP NOT NULL,
ALTER COLUMN "result" DROP NOT NULL,
ALTER COLUMN "notPossibleId" DROP NOT NULL,
ALTER COLUMN "rejectedId" DROP NOT NULL,
ALTER COLUMN "postponedId" DROP NOT NULL,
ALTER COLUMN "cancelledId" DROP NOT NULL,
ALTER COLUMN "closedContractPartnerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CustomerContact" ALTER COLUMN "contactAttemptOn" DROP NOT NULL,
ALTER COLUMN "agentCP" DROP NOT NULL,
ALTER COLUMN "result" DROP NOT NULL,
ALTER COLUMN "orderId" DROP NOT NULL,
ALTER COLUMN "statusReportId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DrinkingWaterHeater" ALTER COLUMN "unitId" DROP NOT NULL,
ALTER COLUMN "drinkingWaterFacilityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "number" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_statusReportId_fkey" FOREIGN KEY ("statusReportId") REFERENCES "StatusReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkingWaterHeater" ADD CONSTRAINT "DrinkingWaterHeater_drinkingWaterFacilityId_fkey" FOREIGN KEY ("drinkingWaterFacilityId") REFERENCES "DrinkingWaterFacility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkingWaterHeater" ADD CONSTRAINT "DrinkingWaterHeater_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_cancelledId_fkey" FOREIGN KEY ("cancelledId") REFERENCES "Cancelled"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_closedContractPartnerId_fkey" FOREIGN KEY ("closedContractPartnerId") REFERENCES "ClosedContractPartner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_notPossibleId_fkey" FOREIGN KEY ("notPossibleId") REFERENCES "NotPossible"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_postponedId_fkey" FOREIGN KEY ("postponedId") REFERENCES "Postponed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_rejectedId_fkey" FOREIGN KEY ("rejectedId") REFERENCES "Rejected"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_receivedId_fkey" FOREIGN KEY ("receivedId") REFERENCES "Received"("id") ON DELETE SET NULL ON UPDATE CASCADE;
