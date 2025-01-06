-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "ExecutionOnSiteNotPossibleId" INTEGER;

-- AlterTable
ALTER TABLE "SamplingPoint" ADD COLUMN     "id_healthAuthorities" INTEGER;

-- AddForeignKey
ALTER TABLE "ExecutionOnSiteNotPossible" ADD CONSTRAINT "ExecutionOnSiteNotPossible_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;
