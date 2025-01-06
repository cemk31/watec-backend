-- AlterTable
ALTER TABLE "CustomerContact" ADD COLUMN     "cancelledId" INTEGER,
ADD COLUMN     "notPossibleId" INTEGER,
ADD COLUMN     "postponedId" INTEGER,
ADD COLUMN     "rejectedId" INTEGER;

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_notPossibleId_fkey" FOREIGN KEY ("notPossibleId") REFERENCES "NotPossible"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_cancelledId_fkey" FOREIGN KEY ("cancelledId") REFERENCES "Cancelled"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_postponedId_fkey" FOREIGN KEY ("postponedId") REFERENCES "Postponed"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_rejectedId_fkey" FOREIGN KEY ("rejectedId") REFERENCES "Rejected"("id") ON DELETE SET NULL ON UPDATE CASCADE;
