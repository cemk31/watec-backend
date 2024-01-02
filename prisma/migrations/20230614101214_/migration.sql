-- AlterTable
ALTER TABLE "adresse_sst" ADD COLUMN     "auftraggeberId" INTEGER;

-- CreateTable
CREATE TABLE "Auftraggeber" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "kundennummer" TEXT,
    "auftraggeber" TEXT,

    CONSTRAINT "Auftraggeber_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adresse_sst" ADD CONSTRAINT "adresse_sst_auftraggeberId_fkey" FOREIGN KEY ("auftraggeberId") REFERENCES "Auftraggeber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Auftraggeber" ADD CONSTRAINT "Auftraggeber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
