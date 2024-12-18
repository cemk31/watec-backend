/*
  Warnings:

  - A unique constraint covering the columns `[DoneId]` on the table `Sync` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CustomerContact" ADD COLUMN     "DoneId" INTEGER;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "DoneId" INTEGER;

-- AlterTable
ALTER TABLE "Sync" ADD COLUMN     "DoneId" INTEGER;

-- CreateTable
CREATE TABLE "Done" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "orderstatusType" TEXT,
    "setOn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "requestId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "syncDataId" INTEGER,
    "isChecked" BOOLEAN DEFAULT false,

    CONSTRAINT "Done_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Done_requestId_key" ON "Done"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "Done_syncDataId_key" ON "Done"("syncDataId");

-- CreateIndex
CREATE UNIQUE INDEX "Sync_DoneId_key" ON "Sync"("DoneId");

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_DoneId_fkey" FOREIGN KEY ("DoneId") REFERENCES "Done"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Done" ADD CONSTRAINT "Done_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Done" ADD CONSTRAINT "Done_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sync" ADD CONSTRAINT "Sync_DoneId_fkey" FOREIGN KEY ("DoneId") REFERENCES "Done"("id") ON DELETE SET NULL ON UPDATE CASCADE;
