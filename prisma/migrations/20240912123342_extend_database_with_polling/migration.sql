/*
  Warnings:

  - You are about to drop the column `unitId` on the `DrinkingWaterHeater` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[drinkingWaterHeaterId]` on the table `Unit` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "DrinkingWaterHeater" DROP CONSTRAINT "DrinkingWaterHeater_unitId_fkey";

-- DropIndex
DROP INDEX "DrinkingWaterHeater_unitId_key";

-- AlterTable
ALTER TABLE "Building" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "postcode" TEXT,
ADD COLUMN     "propertyId" INTEGER,
ADD COLUMN     "street" TEXT,
ADD COLUMN     "streetnumber" TEXT;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "city" TEXT,
ADD COLUMN     "istaId" INTEGER,
ADD COLUMN     "name1" TEXT,
ADD COLUMN     "name2" TEXT,
ADD COLUMN     "postcode" TEXT,
ADD COLUMN     "telephone" TEXT;

-- AlterTable
ALTER TABLE "DrinkingWaterHeater" DROP COLUMN "unitId";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "drinkingWaterFacilityId" INTEGER,
ADD COLUMN     "executionFlag" BOOLEAN,
ADD COLUMN     "propertyId" INTEGER,
ADD COLUMN     "releasedOn" TIMESTAMP(3),
ADD COLUMN     "serviceType" TEXT;

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "addressId" INTEGER,
ADD COLUMN     "contactPersonId" INTEGER,
ADD COLUMN     "id_HealthAuthorities" INTEGER,
ADD COLUMN     "number" INTEGER;

-- AlterTable
ALTER TABLE "Unit" ADD COLUMN     "drinkingWaterHeaterId" INTEGER;

-- CreateTable
CREATE TABLE "ContactPerson" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "forename" TEXT,
    "telephone" TEXT,
    "telephoneMobile" TEXT,
    "role" TEXT,

    CONSTRAINT "ContactPerson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAddress" (
    "id" SERIAL NOT NULL,
    "salutation" TEXT,
    "name" TEXT,
    "street" TEXT,
    "streetnumber" INTEGER,
    "postcode" INTEGER,
    "city" TEXT,
    "country" TEXT,
    "propertyId" INTEGER,

    CONSTRAINT "UserAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Unit_drinkingWaterHeaterId_key" ON "Unit"("drinkingWaterHeaterId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_drinkingWaterFacilityId_fkey" FOREIGN KEY ("drinkingWaterFacilityId") REFERENCES "DrinkingWaterFacility"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_contactPersonId_fkey" FOREIGN KEY ("contactPersonId") REFERENCES "ContactPerson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_drinkingWaterHeaterId_fkey" FOREIGN KEY ("drinkingWaterHeaterId") REFERENCES "DrinkingWaterHeater"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
