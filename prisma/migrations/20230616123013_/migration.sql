-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "remarkExternal" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderStatus" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "setOn" TIMESTAMP(3) NOT NULL,
    "executionOnSiteDone" BOOLEAN NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "OrderStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerContacts" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "CustomerContacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerContact" (
    "id" SERIAL NOT NULL,
    "contactAttemptOn" TIMESTAMP(3) NOT NULL,
    "contactPersonCustomer" TEXT,
    "agentCP" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "remark" TEXT,
    "orderId" INTEGER NOT NULL,
    "customerContactsId" INTEGER,

    CONSTRAINT "CustomerContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportOrderStatusRequest" (
    "id" SERIAL NOT NULL,
    "environment" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "consumer" TEXT NOT NULL,
    "closedContractPartnerId" INTEGER NOT NULL,

    CONSTRAINT "ReportOrderStatusRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClosedContractPartner" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "orderstatusType" INTEGER NOT NULL,
    "setOn" TIMESTAMP(3) NOT NULL,
    "customerContactsId" INTEGER NOT NULL,
    "deficiencyDescription" TEXT,
    "registrationHealthAuthoritiesOn" TIMESTAMP(3),
    "extraordinaryExpenditureReason" TEXT,

    CONSTRAINT "ClosedContractPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuppliedDocuments" (
    "id" SERIAL NOT NULL,
    "closedContractPartnerId" INTEGER,
    "documentId" INTEGER,

    CONSTRAINT "SuppliedDocuments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecordedSystem" (
    "id" SERIAL NOT NULL,
    "drinkingWaterFacilityId" INTEGER NOT NULL,
    "closedContractPartnerId" INTEGER,

    CONSTRAINT "RecordedSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DrinkingWaterFacility" (
    "id" SERIAL NOT NULL,
    "consecutiveNumber" INTEGER NOT NULL,
    "usageType" TEXT,
    "usageTypeOthers" TEXT,
    "numberSuppliedUnits" INTEGER,
    "numberDrinkingWaterHeater" INTEGER,
    "totalVolumeLitres" INTEGER,
    "pipingSystemType_Circulation" BOOLEAN,
    "pipingSystemType_Waterbranchline" BOOLEAN,
    "pipingSystemType_Pipetraceheater" BOOLEAN,
    "pipingVolumeGr3Litres" BOOLEAN,
    "deadPipeKnown" BOOLEAN,
    "deadPipesPosition" TEXT,
    "numberAscendingPipes" INTEGER,
    "aerosolformation" BOOLEAN,
    "explanation" TEXT,
    "numberSuppliedPersons" INTEGER,
    "pipeworkSchematicsAvailable" BOOLEAN,
    "numberColdWaterLegs" INTEGER,
    "numberHotWaterLegs" INTEGER,
    "temperatureCirculationDWH_A" INTEGER,
    "temperatureCirculationDWH_B" INTEGER,
    "heatExchangerSystem_central" BOOLEAN,
    "heatExchangerSystem_districtheating" BOOLEAN,
    "heatExchangerSystem_continuousflowprinciple" BOOLEAN,

    CONSTRAINT "DrinkingWaterFacility_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderStatus" ADD CONSTRAINT "OrderStatus_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_customerContactsId_fkey" FOREIGN KEY ("customerContactsId") REFERENCES "CustomerContacts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReportOrderStatusRequest" ADD CONSTRAINT "ReportOrderStatusRequest_closedContractPartnerId_fkey" FOREIGN KEY ("closedContractPartnerId") REFERENCES "ClosedContractPartner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClosedContractPartner" ADD CONSTRAINT "ClosedContractPartner_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClosedContractPartner" ADD CONSTRAINT "ClosedContractPartner_customerContactsId_fkey" FOREIGN KEY ("customerContactsId") REFERENCES "CustomerContacts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuppliedDocuments" ADD CONSTRAINT "SuppliedDocuments_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuppliedDocuments" ADD CONSTRAINT "SuppliedDocuments_closedContractPartnerId_fkey" FOREIGN KEY ("closedContractPartnerId") REFERENCES "ClosedContractPartner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordedSystem" ADD CONSTRAINT "RecordedSystem_drinkingWaterFacilityId_fkey" FOREIGN KEY ("drinkingWaterFacilityId") REFERENCES "DrinkingWaterFacility"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecordedSystem" ADD CONSTRAINT "RecordedSystem_closedContractPartnerId_fkey" FOREIGN KEY ("closedContractPartnerId") REFERENCES "ClosedContractPartner"("id") ON DELETE SET NULL ON UPDATE CASCADE;
