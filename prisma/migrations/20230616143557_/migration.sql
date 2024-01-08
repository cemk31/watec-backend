/*
  Warnings:

  - You are about to drop the `_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_Nutzeinheit_SSTToTrinkwassererwaermer_SST` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `abgeschlossenvertragspartner_sst` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `adresse_sst` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `auftragsstatus_sst` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `druckstucke_sst` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gebaeude_sst` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gesundheitsamt_sst` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `installationsauftrag_sst` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leistungen_sst` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `liegenschaft_sst` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nutzeinheit_sst` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `probeentnahmestelle_sst` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `steigstrang` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trinkwasseranlage_sst` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trinkwassererwaermer_sst` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST" DROP CONSTRAINT "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST_A_fkey";

-- DropForeignKey
ALTER TABLE "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST" DROP CONSTRAINT "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST_B_fkey";

-- DropForeignKey
ALTER TABLE "_Nutzeinheit_SSTToTrinkwassererwaermer_SST" DROP CONSTRAINT "_Nutzeinheit_SSTToTrinkwassererwaermer_SST_A_fkey";

-- DropForeignKey
ALTER TABLE "_Nutzeinheit_SSTToTrinkwassererwaermer_SST" DROP CONSTRAINT "_Nutzeinheit_SSTToTrinkwassererwaermer_SST_B_fkey";

-- DropForeignKey
ALTER TABLE "abgeschlossenvertragspartner_sst" DROP CONSTRAINT "abgeschlossenvertragspartner_sst_auftragsstatusId_fkey";

-- DropForeignKey
ALTER TABLE "abgeschlossenvertragspartner_sst" DROP CONSTRAINT "abgeschlossenvertragspartner_sst_gesundheitsamtId_fkey";

-- DropForeignKey
ALTER TABLE "abgeschlossenvertragspartner_sst" DROP CONSTRAINT "abgeschlossenvertragspartner_sst_liegenschaftId_fkey";

-- DropForeignKey
ALTER TABLE "adresse_sst" DROP CONSTRAINT "adresse_sst_userId_fkey";

-- DropForeignKey
ALTER TABLE "auftragsstatus_sst" DROP CONSTRAINT "auftragsstatus_sst_installationsauftragId_fkey";

-- DropForeignKey
ALTER TABLE "druckstucke_sst" DROP CONSTRAINT "druckstucke_sst_gelieferteDruckstueckeId_fkey";

-- DropForeignKey
ALTER TABLE "gebaeude_sst" DROP CONSTRAINT "gebaeude_sst_adresseId_fkey";

-- DropForeignKey
ALTER TABLE "leistungen_sst" DROP CONSTRAINT "leistungen_sst_abgeschlossenVertragspartnerId_fkey";

-- DropForeignKey
ALTER TABLE "leistungen_sst" DROP CONSTRAINT "leistungen_sst_leistungErbrachtInId_fkey";

-- DropForeignKey
ALTER TABLE "leistungen_sst" DROP CONSTRAINT "leistungen_sst_probeEntnahmeStelleId_fkey";

-- DropForeignKey
ALTER TABLE "nutzeinheit_sst" DROP CONSTRAINT "nutzeinheit_sst_gebaeudeId_fkey";

-- DropForeignKey
ALTER TABLE "nutzeinheit_sst" DROP CONSTRAINT "nutzeinheit_sst_probeEntnahmeStelleId_fkey";

-- DropForeignKey
ALTER TABLE "nutzeinheit_sst" DROP CONSTRAINT "nutzeinheit_sst_trinkwasseranlageId_fkey";

-- DropForeignKey
ALTER TABLE "probeentnahmestelle_sst" DROP CONSTRAINT "probeentnahmestelle_sst_trinkwasseranlageId_fkey";

-- DropForeignKey
ALTER TABLE "steigstrang" DROP CONSTRAINT "steigstrang_trinkwasserAnlageId_fkey";

-- DropForeignKey
ALTER TABLE "trinkwassererwaermer_sst" DROP CONSTRAINT "trinkwassererwaermer_sst_trinkwasseranlageId_fkey";

-- AlterTable
ALTER TABLE "CustomerContact" ADD COLUMN     "plannedId" INTEGER;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "plannedId" INTEGER;

-- DropTable
DROP TABLE "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST";

-- DropTable
DROP TABLE "_Nutzeinheit_SSTToTrinkwassererwaermer_SST";

-- DropTable
DROP TABLE "abgeschlossenvertragspartner_sst";

-- DropTable
DROP TABLE "adresse_sst";

-- DropTable
DROP TABLE "auftragsstatus_sst";

-- DropTable
DROP TABLE "druckstucke_sst";

-- DropTable
DROP TABLE "gebaeude_sst";

-- DropTable
DROP TABLE "gesundheitsamt_sst";

-- DropTable
DROP TABLE "installationsauftrag_sst";

-- DropTable
DROP TABLE "leistungen_sst";

-- DropTable
DROP TABLE "liegenschaft_sst";

-- DropTable
DROP TABLE "nutzeinheit_sst";

-- DropTable
DROP TABLE "probeentnahmestelle_sst";

-- DropTable
DROP TABLE "steigstrang";

-- DropTable
DROP TABLE "trinkwasseranlage_sst";

-- DropTable
DROP TABLE "trinkwassererwaermer_sst";

-- DropEnum
DROP TYPE "Druckstueckart";

-- DropEnum
DROP TYPE "Einheit";

-- DropEnum
DROP TYPE "Etage";

-- DropEnum
DROP TYPE "Land";

-- DropEnum
DROP TYPE "Leitungssystemart";

-- DropEnum
DROP TYPE "NutzungArtGebaeude";

-- DropEnum
DROP TYPE "Raumbezeichnung";

-- DropEnum
DROP TYPE "Rohrdurchmesser";

-- DropEnum
DROP TYPE "Rohrmaterial";

-- CreateTable
CREATE TABLE "Planned" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "orderstatusType" TEXT NOT NULL,
    "setOn" TIMESTAMP(3) NOT NULL,
    "detailedScheduleDate" TIMESTAMP(3) NOT NULL,
    "detailedScheduleTimeFrom" TIMESTAMP(3),
    "detailedScheduleTimeTo" TIMESTAMP(3),
    "detailedScheduleDelayReason" TEXT,
    "requestId" INTEGER NOT NULL,

    CONSTRAINT "Planned_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Planned_requestId_key" ON "Planned"("requestId");

-- AddForeignKey
ALTER TABLE "CustomerContact" ADD CONSTRAINT "CustomerContact_plannedId_fkey" FOREIGN KEY ("plannedId") REFERENCES "Planned"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planned" ADD CONSTRAINT "Planned_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Planned" ADD CONSTRAINT "Planned_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
