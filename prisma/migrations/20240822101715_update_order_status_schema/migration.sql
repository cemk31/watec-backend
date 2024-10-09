/*
  Warnings:

  - You are about to drop the column `drinkingWaterFacilityId` on the `RecordedSystem` table. All the data in the column will be lost.
  - You are about to drop the column `propertyId` on the `RecordedSystem` table. All the data in the column will be lost.
  - You are about to drop the column `reason` on the `Rejected` table. All the data in the column will be lost.
  - You are about to drop the column `reasonText` on the `Rejected` table. All the data in the column will be lost.
  - You are about to drop the column `recordedSystemId` on the `Service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[customerId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[syncDataId]` on the table `Cancelled` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[syncDataId]` on the table `ClosedContractPartner` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recordedSystemId]` on the table `DrinkingWaterFacility` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unitId]` on the table `DrinkingWaterHeater` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[syncDataId]` on the table `NotPossible` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[syncDataId]` on the table `Planned` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[syncDataId]` on the table `Postponed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recordedSystemId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[syncDataId]` on the table `Received` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `RecordedSystem` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[syncDataId]` on the table `Rejected` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[confirmationToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Status" ADD VALUE 'DONE';
ALTER TYPE "Status" ADD VALUE 'CLOSEDCONTRACTPARTNER';
ALTER TYPE "Status" ADD VALUE 'EXECUTION_ON_SITE_NOT_POSSIBLE';

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_customerId_fkey";

-- DropForeignKey
ALTER TABLE "RecordedSystem" DROP CONSTRAINT "RecordedSystem_drinkingWaterFacilityId_fkey";

-- DropForeignKey
ALTER TABLE "RecordedSystem" DROP CONSTRAINT "RecordedSystem_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_recordedSystemId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "houseNumber" TEXT,
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "postcode" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "customerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "AscendingPipe" ALTER COLUMN "consecutiveNumber" DROP NOT NULL,
ALTER COLUMN "ascendingPipeTemperatureDisplayPresent" DROP NOT NULL,
ALTER COLUMN "circulationTemperatureDisplayPresent" DROP NOT NULL,
ALTER COLUMN "pipeDiameter" DROP NOT NULL,
ALTER COLUMN "pipeMaterialtype" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Cancelled" ADD COLUMN     "syncDataId" INTEGER;

-- AlterTable
ALTER TABLE "ClosedContractPartner" ADD COLUMN     "syncDataId" INTEGER,
ALTER COLUMN "registrationHealthAuthoritiesOn" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "addressId" INTEGER;

-- AlterTable
ALTER TABLE "CustomerContact" ADD COLUMN     "executionOnSiteNotPossibleId" INTEGER;

-- AlterTable
ALTER TABLE "DrinkingWaterFacility" ADD COLUMN     "recordedSystemId" INTEGER,
ALTER COLUMN "consecutiveNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DrinkingWaterHeater" ALTER COLUMN "consecutiveNumber" DROP NOT NULL;

-- AlterTable
ALTER TABLE "NotPossible" ADD COLUMN     "syncDataId" INTEGER;

-- AlterTable
ALTER TABLE "Planned" ADD COLUMN     "syncDataId" INTEGER,
ALTER COLUMN "detailedScheduleTimeFrom" SET DATA TYPE TEXT,
ALTER COLUMN "detailedScheduleTimeTo" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Postponed" ADD COLUMN     "syncDataId" INTEGER;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "recordedSystemId" INTEGER,
ALTER COLUMN "hotwatersupplyType_central" DROP NOT NULL,
ALTER COLUMN "hotwatersupplyType_decentral" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Received" ADD COLUMN     "syncDataId" INTEGER,
ALTER COLUMN "orderstatusType" SET DEFAULT '007';

-- AlterTable
CREATE SEQUENCE recordedsystem_closedcontractpartnerid_seq;
ALTER TABLE "RecordedSystem" DROP COLUMN "drinkingWaterFacilityId",
DROP COLUMN "propertyId",
ALTER COLUMN "closedContractPartnerId" SET DEFAULT nextval('recordedsystem_closedcontractpartnerid_seq');
ALTER SEQUENCE recordedsystem_closedcontractpartnerid_seq OWNED BY "RecordedSystem"."closedContractPartnerId";

-- AlterTable
ALTER TABLE "Rejected" DROP COLUMN "reason",
DROP COLUMN "reasonText",
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "rejectionReasonText" TEXT,
ADD COLUMN     "syncDataId" INTEGER;

-- AlterTable
ALTER TABLE "SamplingPoint" ALTER COLUMN "consecutiveNumber" DROP NOT NULL,
ALTER COLUMN "positionDetail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "recordedSystemId",
ADD COLUMN     "closedContractPartnerId" INTEGER,
ALTER COLUMN "articleNumber_ista" DROP NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "unit" DROP NOT NULL,
ALTER COLUMN "extraordinaryExpenditure" DROP NOT NULL,
ALTER COLUMN "addressId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Unit" ALTER COLUMN "floor" DROP NOT NULL,
ALTER COLUMN "storey" DROP NOT NULL,
ALTER COLUMN "generalUnit" DROP NOT NULL;

-- AlterTable
ALTER TABLE "objekt" ADD COLUMN     "customerId" INTEGER;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "confirmationToken" TEXT,
ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ExecutionOnSiteNotPossible" (
    "id" SERIAL NOT NULL,
    "orderstatusType" TEXT NOT NULL DEFAULT '003',
    "setOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "requestId" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "orderId" INTEGER NOT NULL,
    "syncDataId" INTEGER,
    "nonExecutionReason" TEXT,

    CONSTRAINT "ExecutionOnSiteNotPossible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sync" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastSyncTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusType" "Status" NOT NULL,
    "syncStatus" TEXT NOT NULL,
    "syncError" TEXT,
    "userEmail" TEXT,
    "userId" INTEGER NOT NULL,
    "receivedId" INTEGER,
    "plannedId" INTEGER,
    "postponedId" INTEGER,
    "rejectedId" INTEGER,
    "cancelledId" INTEGER,
    "notPossibleId" INTEGER,
    "closedContractPartnerId" INTEGER,
    "executionOnSiteNotPossibleId" INTEGER,

    CONSTRAINT "Sync_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExecutionOnSiteNotPossible_requestId_key" ON "ExecutionOnSiteNotPossible"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "ExecutionOnSiteNotPossible_syncDataId_key" ON "ExecutionOnSiteNotPossible"("syncDataId");

-- CreateIndex
CREATE UNIQUE INDEX "Sync_receivedId_key" ON "Sync"("receivedId");

-- CreateIndex
CREATE UNIQUE INDEX "Sync_plannedId_key" ON "Sync"("plannedId");

-- CreateIndex
CREATE UNIQUE INDEX "Sync_postponedId_key" ON "Sync"("postponedId");

-- CreateIndex
CREATE UNIQUE INDEX "Sync_rejectedId_key" ON "Sync"("rejectedId");

-- CreateIndex
CREATE UNIQUE INDEX "Sync_cancelledId_key" ON "Sync"("cancelledId");

-- CreateIndex
CREATE UNIQUE INDEX "Sync_notPossibleId_key" ON "Sync"("notPossibleId");

-- CreateIndex
CREATE UNIQUE INDEX "Sync_closedContractPartnerId_key" ON "Sync"("closedContractPartnerId");

-- CreateIndex
CREATE UNIQUE INDEX "Sync_executionOnSiteNotPossibleId_key" ON "Sync"("executionOnSiteNotPossibleId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_customerId_key" ON "Address"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Cancelled_syncDataId_key" ON "Cancelled"("syncDataId");

-- CreateIndex
CREATE UNIQUE INDEX "ClosedContractPartner_syncDataId_key" ON "ClosedContractPartner"("syncDataId");

-- CreateIndex
CREATE UNIQUE INDEX "DrinkingWaterFacility_recordedSystemId_key" ON "DrinkingWaterFacility"("recordedSystemId");

-- CreateIndex
CREATE UNIQUE INDEX "DrinkingWaterHeater_unitId_key" ON "DrinkingWaterHeater"("unitId");

-- CreateIndex
CREATE UNIQUE INDEX "NotPossible_syncDataId_key" ON "NotPossible"("syncDataId");

-- CreateIndex
CREATE UNIQUE INDEX "Planned_syncDataId_key" ON "Planned"("syncDataId");

-- CreateIndex
CREATE UNIQUE INDEX "Postponed_syncDataId_key" ON "Postponed"("syncDataId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_recordedSystemId_key" ON "Property"("recordedSystemId");

-- CreateIndex
CREATE UNIQUE INDEX "Received_syncDataId_key" ON "Received"("syncDataId");

-- CreateIndex
CREATE UNIQUE INDEX "RecordedSystem_id_key" ON "RecordedSystem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rejected_syncDataId_key" ON "Rejected"("syncDataId");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_id_key" ON "Unit"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_confirmationToken_key" ON "users"("confirmationToken");

-- AddForeignKey
ALTER TABLE "objekt" ADD CONSTRAINT "objekt_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_executionOnSiteNotPossibleId_fkey" FOREIGN KEY ("executionOnSiteNotPossibleId") REFERENCES "ExecutionOnSiteNotPossible"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_recordedSystemId_fkey" FOREIGN KEY ("recordedSystemId") REFERENCES "RecordedSystem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_closedContractPartnerId_fkey" FOREIGN KEY ("closedContractPartnerId") REFERENCES "ClosedContractPartner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkingWaterFacility" ADD CONSTRAINT "DrinkingWaterFacility_recordedSystemId_fkey" FOREIGN KEY ("recordedSystemId") REFERENCES "RecordedSystem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutionOnSiteNotPossible" ADD CONSTRAINT "ExecutionOnSiteNotPossible_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_receivedId_fkey" FOREIGN KEY ("receivedId") REFERENCES "Received"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_plannedId_fkey" FOREIGN KEY ("plannedId") REFERENCES "Planned"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_postponedId_fkey" FOREIGN KEY ("postponedId") REFERENCES "Postponed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_rejectedId_fkey" FOREIGN KEY ("rejectedId") REFERENCES "Rejected"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_cancelledId_fkey" FOREIGN KEY ("cancelledId") REFERENCES "Cancelled"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_notPossibleId_fkey" FOREIGN KEY ("notPossibleId") REFERENCES "NotPossible"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_closedContractPartnerId_fkey" FOREIGN KEY ("closedContractPartnerId") REFERENCES "ClosedContractPartner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_executionOnSiteNotPossibleId_fkey" FOREIGN KEY ("executionOnSiteNotPossibleId") REFERENCES "ExecutionOnSiteNotPossible"("id") ON DELETE SET NULL ON UPDATE CASCADE;
