/*
  Warnings:

  - You are about to drop the column `customerContactsId` on the `ClosedContractPartner` table. All the data in the column will be lost.
  - You are about to drop the column `customerContactsId` on the `CustomerContact` table. All the data in the column will be lost.
  - You are about to drop the `CustomerContacts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerContactId` to the `ClosedContractPartner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ClosedContractPartner" DROP CONSTRAINT "ClosedContractPartner_customerContactsId_fkey";

-- DropForeignKey
ALTER TABLE "CustomerContact" DROP CONSTRAINT "CustomerContact_customerContactsId_fkey";

-- AlterTable
ALTER TABLE "ClosedContractPartner" DROP COLUMN "customerContactsId",
ADD COLUMN     "customerContactId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CustomerContact" DROP COLUMN "customerContactsId";

-- AlterTable
ALTER TABLE "RecordedSystem" ADD COLUMN     "propertyId" INTEGER;

-- DropTable
DROP TABLE "CustomerContacts";

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "hotwatersupplyType_central" BOOLEAN NOT NULL,
    "hotwatersupplyType_decentral" BOOLEAN NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "articleNumber_ista" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "extraordinaryExpenditure" BOOLEAN NOT NULL,
    "purchasePrice_ista" DOUBLE PRECISION,
    "warranty" BOOLEAN,
    "addressId" INTEGER NOT NULL,
    "recordedSystemId" INTEGER,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinkingWaterHeater" (
    "id" SERIAL NOT NULL,
    "consecutiveNumber" INTEGER NOT NULL,
    "inletTemperatureDisplayPresent" BOOLEAN,
    "inletTemperature" INTEGER,
    "outletTemperatureDisplayPresent" BOOLEAN,
    "outletTemperature" INTEGER,
    "pipeDiameterOutlet" TEXT,
    "pipeMaterialtypeOutlet" TEXT,
    "volumeLitre" INTEGER,
    "roomType" TEXT,
    "roomPosition" INTEGER,
    "positionDetail" TEXT,
    "unitId" INTEGER NOT NULL,
    "drinkingWaterFacilityId" INTEGER NOT NULL,

    CONSTRAINT "DrinkingWaterHeater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AscendingPipe" (
    "id" SERIAL NOT NULL,
    "consecutiveNumber" INTEGER NOT NULL,
    "ascendingPipeTemperatureDisplayPresent" BOOLEAN NOT NULL,
    "flowTemperature" INTEGER,
    "circulationTemperatureDisplayPresent" BOOLEAN NOT NULL,
    "circulationTemperature" INTEGER,
    "pipeDiameter" TEXT NOT NULL,
    "pipeMaterialtype" TEXT NOT NULL,
    "drinkingWaterFacilityId" INTEGER NOT NULL,

    CONSTRAINT "AscendingPipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SamplingPoints" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "SamplingPoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SamplingPoint" (
    "id" SERIAL NOT NULL,
    "consecutiveNumber" INTEGER NOT NULL,
    "installationNumber" INTEGER,
    "numberObjectInstallationLocation" INTEGER,
    "pipingSystemType" TEXT,
    "remoteSamplingPoint" BOOLEAN,
    "roomType" TEXT,
    "roomPosition" INTEGER,
    "positionDetail" TEXT NOT NULL,
    "unitId" INTEGER NOT NULL,
    "drinkingWaterFacilityId" INTEGER NOT NULL,
    "samplingPointsId" INTEGER,

    CONSTRAINT "SamplingPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "floor" INTEGER NOT NULL,
    "storey" TEXT NOT NULL,
    "position" INTEGER,
    "userName" TEXT,
    "generalUnit" BOOLEAN NOT NULL,
    "buildingId" INTEGER NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "Building_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "streetnumber" TEXT,
    "postcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Envelope" (
    "id" SERIAL NOT NULL,
    "headerId" INTEGER NOT NULL,
    "bodyId" INTEGER NOT NULL,

    CONSTRAINT "Envelope_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Header" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Header_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Body" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,

    CONSTRAINT "Body_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "environment" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "consumer" TEXT NOT NULL,
    "rejectedId" INTEGER,
    "notPossibleId" INTEGER,
    "postponedId" INTEGER,
    "cancelledId" INTEGER,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Postponed" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "statusType" TEXT NOT NULL,
    "setOn" TIMESTAMP(3) NOT NULL,
    "nextContactAttemptOn" TIMESTAMP(3) NOT NULL,
    "postponedReason" TEXT NOT NULL,

    CONSTRAINT "Postponed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rejected" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "statusType" INTEGER NOT NULL,
    "setOn" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "reasonText" TEXT,

    CONSTRAINT "Rejected_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotPossible" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "statusType" TEXT NOT NULL,
    "setOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotPossible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "contactAttemptOn" TIMESTAMP(3) NOT NULL,
    "contactPerson" TEXT,
    "agentCP" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "remark" TEXT,
    "notPossibleId" INTEGER NOT NULL,
    "rejectedId" INTEGER NOT NULL,
    "postponedId" INTEGER NOT NULL,
    "cancelledId" INTEGER NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cancelled" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "statusType" TEXT NOT NULL,
    "setOn" TIMESTAMP(3) NOT NULL,
    "cancellationReason" TEXT NOT NULL,

    CONSTRAINT "Cancelled_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Envelope_headerId_key" ON "Envelope"("headerId");

-- CreateIndex
CREATE UNIQUE INDEX "Envelope_bodyId_key" ON "Envelope"("bodyId");

-- CreateIndex
CREATE UNIQUE INDEX "Body_requestId_key" ON "Body"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "Postponed_requestId_key" ON "Postponed"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "Rejected_requestId_key" ON "Rejected"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "NotPossible_requestId_key" ON "NotPossible"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "Cancelled_requestId_key" ON "Cancelled"("requestId");

-- AddForeignKey
ALTER TABLE "ClosedContractPartner" ADD CONSTRAINT "ClosedContractPartner_customerContactId_fkey" FOREIGN KEY ("customerContactId") REFERENCES "CustomerContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordedSystem" ADD CONSTRAINT "RecordedSystem_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_recordedSystemId_fkey" FOREIGN KEY ("recordedSystemId") REFERENCES "RecordedSystem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkingWaterHeater" ADD CONSTRAINT "DrinkingWaterHeater_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DrinkingWaterHeater" ADD CONSTRAINT "DrinkingWaterHeater_drinkingWaterFacilityId_fkey" FOREIGN KEY ("drinkingWaterFacilityId") REFERENCES "DrinkingWaterFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AscendingPipe" ADD CONSTRAINT "AscendingPipe_drinkingWaterFacilityId_fkey" FOREIGN KEY ("drinkingWaterFacilityId") REFERENCES "DrinkingWaterFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SamplingPoint" ADD CONSTRAINT "SamplingPoint_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SamplingPoint" ADD CONSTRAINT "SamplingPoint_drinkingWaterFacilityId_fkey" FOREIGN KEY ("drinkingWaterFacilityId") REFERENCES "DrinkingWaterFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SamplingPoint" ADD CONSTRAINT "SamplingPoint_samplingPointsId_fkey" FOREIGN KEY ("samplingPointsId") REFERENCES "SamplingPoints"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envelope" ADD CONSTRAINT "Envelope_headerId_fkey" FOREIGN KEY ("headerId") REFERENCES "Header"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Envelope" ADD CONSTRAINT "Envelope_bodyId_fkey" FOREIGN KEY ("bodyId") REFERENCES "Body"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Body" ADD CONSTRAINT "Body_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Postponed" ADD CONSTRAINT "Postponed_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Postponed" ADD CONSTRAINT "Postponed_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rejected" ADD CONSTRAINT "Rejected_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rejected" ADD CONSTRAINT "Rejected_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotPossible" ADD CONSTRAINT "NotPossible_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotPossible" ADD CONSTRAINT "NotPossible_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_notPossibleId_fkey" FOREIGN KEY ("notPossibleId") REFERENCES "NotPossible"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_rejectedId_fkey" FOREIGN KEY ("rejectedId") REFERENCES "Rejected"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_postponedId_fkey" FOREIGN KEY ("postponedId") REFERENCES "Postponed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_cancelledId_fkey" FOREIGN KEY ("cancelledId") REFERENCES "Cancelled"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cancelled" ADD CONSTRAINT "Cancelled_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cancelled" ADD CONSTRAINT "Cancelled_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
