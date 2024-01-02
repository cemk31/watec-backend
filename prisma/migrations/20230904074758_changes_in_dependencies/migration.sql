-- DropForeignKey
ALTER TABLE "Planned" DROP CONSTRAINT "Planned_requestId_fkey";

-- DropForeignKey
ALTER TABLE "RecordedSystem" DROP CONSTRAINT "RecordedSystem_drinkingWaterFacilityId_fkey";

-- DropForeignKey
ALTER TABLE "ReportOrderStatusRequest" DROP CONSTRAINT "ReportOrderStatusRequest_closedContractPartnerId_fkey";

-- AlterTable
ALTER TABLE "NotPossible" ALTER COLUMN "statusType" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Planned" ALTER COLUMN "orderstatusType" DROP NOT NULL,
ALTER COLUMN "detailedScheduleDate" DROP NOT NULL,
ALTER COLUMN "requestId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RecordedSystem" ALTER COLUMN "drinkingWaterFacilityId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ReportOrderStatusRequest" ALTER COLUMN "closedContractPartnerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ReportOrderStatusRequest" ADD CONSTRAINT "ReportOrderStatusRequest_closedContractPartnerId_fkey" FOREIGN KEY ("closedContractPartnerId") REFERENCES "ClosedContractPartner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordedSystem" ADD CONSTRAINT "RecordedSystem_drinkingWaterFacilityId_fkey" FOREIGN KEY ("drinkingWaterFacilityId") REFERENCES "DrinkingWaterFacility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planned" ADD CONSTRAINT "Planned_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
