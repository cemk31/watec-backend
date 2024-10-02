/*
  Warnings:

  - The `number` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "number",
ADD COLUMN     "number" BIGINT,
ALTER COLUMN "propertyNumber" SET DATA TYPE BIGINT,
ALTER COLUMN "orderNumberIsta" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "id_HealthAuthorities" SET DATA TYPE BIGINT,
ALTER COLUMN "number" SET DATA TYPE BIGINT;
