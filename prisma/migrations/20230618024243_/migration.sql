-- DropForeignKey
ALTER TABLE "Cancelled" DROP CONSTRAINT "Cancelled_requestId_fkey";

-- DropForeignKey
ALTER TABLE "NotPossible" DROP CONSTRAINT "NotPossible_requestId_fkey";

-- DropForeignKey
ALTER TABLE "Received" DROP CONSTRAINT "Received_requestId_fkey";

-- AlterTable
ALTER TABLE "Cancelled" ALTER COLUMN "requestId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "NotPossible" ALTER COLUMN "requestId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Received" ALTER COLUMN "requestId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "NotPossible" ADD CONSTRAINT "NotPossible_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cancelled" ADD CONSTRAINT "Cancelled_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Received" ADD CONSTRAINT "Received_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
