/*
  Warnings:

  - The `propertyNumber` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "propertyNumber",
ADD COLUMN     "propertyNumber" BIGINT;
