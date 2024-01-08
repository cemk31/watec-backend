-- DropForeignKey
ALTER TABLE "Rejected" DROP CONSTRAINT "Rejected_requestId_fkey";

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Rejected" ALTER COLUMN "requestId" DROP NOT NULL,
ALTER COLUMN "statusType" DROP NOT NULL,
ALTER COLUMN "reason" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Rejected" ADD CONSTRAINT "Rejected_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
