/*
  Warnings:

  - You are about to alter the column `propertyNumber` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `propertyNumber` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "propertyNumber" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "propertyNumber" SET DATA TYPE INTEGER;
