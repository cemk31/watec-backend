-- AlterTable
ALTER TABLE "CustomerContact" ADD COLUMN     "receivedId" INTEGER;

-- CreateTable
CREATE TABLE "Received" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "orderstatusType" TEXT NOT NULL,
    "setOn" TIMESTAMP(3) NOT NULL,
    "requestId" INTEGER NOT NULL,

    CONSTRAINT "Received_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Received_requestId_key" ON "Received"("requestId");

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_receivedId_fkey" FOREIGN KEY ("receivedId") REFERENCES "Received"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Received" ADD CONSTRAINT "Received_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Received" ADD CONSTRAINT "Received_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
