/*
  Warnings:

  - The values [EXECUTION_ON_SITE_NOT_POSSIBLE] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('RECEIVED', 'PLANNED', 'NOTPOSSIBLE', 'POSTPONED', 'REJECTED', 'CLOSED', 'CANCELLED', 'DONE', 'CLOSEDCONTRACTPARTNER', 'EXECUTIONONSITENOTPOSSIBLE');
ALTER TABLE "Order" ALTER COLUMN "actualStatus" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "actualStatus" TYPE "Status_new" USING ("actualStatus"::text::"Status_new");
ALTER TABLE "Sync" ALTER COLUMN "statusType" TYPE "Status_new" USING ("statusType"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Order" ALTER COLUMN "actualStatus" SET DEFAULT 'RECEIVED';
COMMIT;
