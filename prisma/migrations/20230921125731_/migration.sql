-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'CANCELLED';

-- AlterTable
ALTER TABLE "Cancelled" ALTER COLUMN "statusType" DROP NOT NULL;
