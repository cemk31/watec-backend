/*
  Warnings:

  - Added the required column `customerId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusReportId` to the `CustomerContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "fax" TEXT,
ADD COLUMN     "propertyNumber" TEXT;

-- AlterTable
ALTER TABLE "CustomerContact" ADD COLUMN     "statusReportId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "StatusReport" (
    "id" SERIAL NOT NULL,
    "orderNo" TEXT NOT NULL,
    "currentDatetime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StatusReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_statusReportId_fkey" FOREIGN KEY ("statusReportId") REFERENCES "StatusReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
