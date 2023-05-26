/*
  Warnings:

  - You are about to drop the `Bookmark` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Auftragsstatus" AS ENUM ('Eingegangen', 'Kundenkontakt_nicht_moeglich', 'Kundenkontakt_verschoben', 'Geplant', 'Ausfuehrung_vor_Ort_erfolgt', 'Ausfuehrung_vor_Ort_nicht_moeglich', 'Abgeschlossen_Vertragspartner', 'Abgelehnt', 'Storniert');

-- CreateEnum
CREATE TYPE "Druckstueckart" AS ENUM ('Anmeldung_Gesundheitsamt', 'Foto');

-- CreateEnum
CREATE TYPE "Einheit" AS ENUM ('Stck', 'm', 'kg', 'l', 'h', 'km');

-- CreateEnum
CREATE TYPE "NutzungArtGebaeude" AS ENUM ('gewerblich', 'oeffentlich', 'sonstiges');

-- CreateEnum
CREATE TYPE "Leitungssystemart" AS ENUM ('Stichleitung', 'Kaltwasser', 'Zirkulation', 'Rohrbegleitheizung', 'TWE_Eingang', 'TWE_Ausgang', 'WW_Steigstrang', 'WW_Verteilleitung');

-- CreateEnum
CREATE TYPE "Raumbezeichnung" AS ENUM ('Keller', 'Treppenhaus', 'Bad', 'Kinderzimmer');

-- CreateEnum
CREATE TYPE "Rohrmaterial" AS ENUM ('verzinkter_Stahl', 'unbekannt_Kunststoff', 'Blei', 'Kupfer', 'Edelstahl');

-- CreateEnum
CREATE TYPE "Rohrdurchmesser" AS ENUM ('DN10', 'DN15', 'DN20', 'DN25', 'DN32', 'DN40', 'DN50', 'DN65', 'DN80_greater', 'DN80', 'DN12');

-- CreateEnum
CREATE TYPE "Etage" AS ENUM ('Erdgeschoss', 'Obergeschoss', 'Untergeschoss', 'Zwischengeschoss', 'Aussenanlage');

-- CreateEnum
CREATE TYPE "Land" AS ENUM ('DE', 'AT', 'CH', 'NL', 'DK', 'PL');

-- DropTable
DROP TABLE "Bookmark";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "installationsauftrag_sst" (
    "id" SERIAL NOT NULL,
    "nummer" INTEGER NOT NULL,
    "bemerkungExtern" TEXT,
    "auftragsstatusId" INTEGER,

    CONSTRAINT "installationsauftrag_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auftragsstatus_sst" (
    "id" SERIAL NOT NULL,
    "auftragStatusArt" "Auftragsstatus" NOT NULL,
    "gesetztAm" TIMESTAMP(3) NOT NULL,
    "installationsauftragId" INTEGER NOT NULL,
    "abgeschlossenVertragspartnerId" INTEGER NOT NULL,

    CONSTRAINT "auftragsstatus_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liegenschaft_sst" (
    "id" SERIAL NOT NULL,
    "warmwasserversorgungArt_zentral" BOOLEAN NOT NULL,
    "warmwasserversorgungArt_dezentral" BOOLEAN NOT NULL,
    "abgeschlossenVertragspartnerId" INTEGER NOT NULL,

    CONSTRAINT "liegenschaft_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leistungen_sst" (
    "id" SERIAL NOT NULL,
    "artikelnummer_ista" INTEGER NOT NULL,
    "menge" DOUBLE PRECISION NOT NULL,
    "einheit" "Einheit" NOT NULL,
    "sonderaufwand" BOOLEAN NOT NULL,
    "verkaufspreis_GC" DOUBLE PRECISION NOT NULL,
    "einkaufspreis_ista" DOUBLE PRECISION NOT NULL,
    "artikelnummer_GC" TEXT NOT NULL,
    "gewaehrleistung" BOOLEAN NOT NULL,
    "artikelBezeichnung_GC" BOOLEAN NOT NULL,
    "leistungErbrachtInId" INTEGER NOT NULL,
    "probeEntnahmeStelleId" INTEGER NOT NULL,
    "abgeschlossenVertragspartnerId" INTEGER NOT NULL,

    CONSTRAINT "leistungen_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trinkwasseranlage_sst" (
    "id" SERIAL NOT NULL,
    "laufendeNummer" INTEGER NOT NULL,
    "nutzungArt" "NutzungArtGebaeude",
    "nutzungArtSonstige" VARCHAR(40),
    "anzahlVersorgteNutzeinheiten" INTEGER,
    "anzahlTrinkwassererwaermer" INTEGER,
    "summeVolumenLiter" INTEGER,
    "leitungssystemArt_Zirkulation" BOOLEAN,
    "leitungssystemArt_Stichleitung" BOOLEAN,
    "leitungssystemArt_Rohrbegleitheizung" BOOLEAN,
    "leitungsVolumenGr3Liter" BOOLEAN,
    "totleitungBekannt" BOOLEAN,
    "lageTotleitungen" VARCHAR(240),
    "anzahlSteigstraenge" INTEGER,
    "aerosolbildung" BOOLEAN DEFAULT true,
    "erlaeuterung" VARCHAR(240),
    "anzahlVersorgtePersonen" INTEGER,
    "leitungsschemaVorhanden" BOOLEAN,
    "anzahlKaltwasserstraenge" INTEGER,
    "anzahlWarmwasserstraenge" INTEGER,
    "temperaturZirkulationTWE_A" INTEGER,
    "temperaturZirkulationTWE_B" INTEGER,
    "waermetauschersystem_zentral" BOOLEAN,
    "waermetauschersystem_fernwaerme" BOOLEAN,
    "waermetauschersystem_durchflussprinzip" BOOLEAN,
    "aufgenommeneEntnahmeStelleId" INTEGER,
    "nutzEinheitId" INTEGER,

    CONSTRAINT "trinkwasseranlage_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trinkwassererwaermer_sst" (
    "id" SERIAL NOT NULL,
    "laufendeNummer" INTEGER NOT NULL,
    "temperaturAnzeigeEingangVorhanden" BOOLEAN,
    "temperaturEingang" INTEGER,
    "temperaturAnzeigeAusgangVorhanden" BOOLEAN,
    "temperaturAusgang" INTEGER,
    "rohrDMAusgang" "Rohrdurchmesser",
    "rohrMaterialartAusgang" "Rohrmaterial",
    "volumenLiter" INTEGER,
    "raumTyp" "Raumbezeichnung",
    "lageRaum" INTEGER,
    "lageDetail" VARCHAR(20),
    "trinkwasseranlageId" INTEGER NOT NULL,

    CONSTRAINT "trinkwassererwaermer_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "probeentnahmestelle_sst" (
    "id" SERIAL NOT NULL,
    "laufendeNummer" INTEGER NOT NULL,
    "nummerInstallation" VARCHAR(30),
    "nummerObjektEinbauort" INTEGER,
    "leitungssystemArt" "Leitungssystemart" NOT NULL,
    "entfernteEntnahmestelle" BOOLEAN NOT NULL,
    "raumTyp" "Raumbezeichnung",
    "lageRaum" INTEGER,
    "lageDetail" VARCHAR(100),
    "trinkwasseranlageId" INTEGER NOT NULL,
    "nutzeinheitId" INTEGER NOT NULL,

    CONSTRAINT "probeentnahmestelle_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "abgeschlossenvertragspartner_sst" (
    "id" SERIAL NOT NULL,
    "maengelBeschreibung" TEXT NOT NULL,
    "anmeldungGesundheitsAmt" TIMESTAMP(3) NOT NULL,
    "sonderaufwandGrund" TEXT NOT NULL,
    "gesundheitsamtId" INTEGER NOT NULL,
    "auftragsstatusId" INTEGER NOT NULL,
    "liegenschaftId" INTEGER NOT NULL,

    CONSTRAINT "abgeschlossenvertragspartner_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gesundheitsamt_sst" (
    "id" SERIAL NOT NULL,
    "name1" TEXT NOT NULL,
    "name2" TEXT NOT NULL,
    "plz" INTEGER NOT NULL,
    "ort" TEXT NOT NULL,
    "strasse_hausnummer" TEXT NOT NULL,
    "telefon" TEXT NOT NULL,
    "telefax" TEXT NOT NULL,
    "mail" TEXT NOT NULL,

    CONSTRAINT "gesundheitsamt_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutzeinheit_sst" (
    "id" SERIAL NOT NULL,
    "stockwerk" INTEGER NOT NULL,
    "etage" "Etage" NOT NULL,
    "lage" INTEGER,
    "nutzerName" TEXT,
    "allgemeineNutzeinheit" BOOLEAN NOT NULL,
    "gebaeudeId" INTEGER NOT NULL,
    "trinkwassererwaermerId" INTEGER NOT NULL,
    "trinkwasseranlageId" INTEGER NOT NULL,
    "probeEntnahmeStelleId" INTEGER NOT NULL,

    CONSTRAINT "nutzeinheit_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "steigstrang" (
    "id" SERIAL NOT NULL,
    "laufendeNummer" INTEGER,
    "temperaturVorlauf" INTEGER,
    "temperaturZirkulation" INTEGER,
    "rohrDM" "Rohrdurchmesser" NOT NULL,
    "rohrMaterialart" "Rohrmaterial" NOT NULL,
    "temperaturAnzeigeSteigstrangVorhanden" BOOLEAN NOT NULL,
    "temperaturAnzeigeZirkulationVorhanden" BOOLEAN NOT NULL,
    "trinkwasserAnlageId" INTEGER,

    CONSTRAINT "steigstrang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gebaeude_sst" (
    "id" SERIAL NOT NULL,
    "leistungenId" INTEGER NOT NULL,
    "adresseId" INTEGER NOT NULL,
    "nutzEinheitId" INTEGER NOT NULL,

    CONSTRAINT "gebaeude_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adresse_sst" (
    "id" SERIAL NOT NULL,
    "strasse" TEXT NOT NULL,
    "hausnummer" VARCHAR(10) NOT NULL,
    "ort" VARCHAR(40) NOT NULL,
    "land" "Land",
    "userId" INTEGER,

    CONSTRAINT "adresse_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "druckstucke_sst" (
    "id" SERIAL NOT NULL,
    "art" "Druckstueckart" NOT NULL,
    "inhalt" TEXT NOT NULL,
    "gelieferteDruckstueckeId" INTEGER NOT NULL,

    CONSTRAINT "druckstucke_sst_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auftrag" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "done" BOOLEAN NOT NULL,
    "emailEingang" TIMESTAMP(3) NOT NULL,
    "bemerkung" TEXT,
    "vorgemerkt" TEXT,
    "liNr" TEXT NOT NULL,
    "adresseLi" TEXT NOT NULL,
    "plzLi" TEXT NOT NULL,
    "ortLi" TEXT NOT NULL,
    "vwBuro" TEXT NOT NULL,
    "vwMa" TEXT NOT NULL,
    "mailadresseVw" TEXT NOT NULL,
    "telVw" TEXT NOT NULL,
    "hmName" TEXT NOT NULL,
    "hmTel" TEXT NOT NULL,
    "emailBetreff" TEXT NOT NULL,
    "emailAnhang" TEXT,
    "bestatigungVersendet" BOOLEAN NOT NULL,
    "anfrageThema" TEXT NOT NULL,
    "anfrageBestatigt" BOOLEAN NOT NULL,
    "angebotErstellt" BOOLEAN NOT NULL,
    "angebotsnummer" TEXT,
    "angebot" TEXT,
    "auftragbestatigung" BOOLEAN NOT NULL,
    "vwBestatigung" TEXT,
    "terminiertZum" TIMESTAMP(3) NOT NULL,
    "uhrzeit" TIMESTAMP(3) NOT NULL,
    "aushang" BOOLEAN NOT NULL,
    "datumAushang" TIMESTAMP(3),
    "agInformiert" BOOLEAN NOT NULL,
    "bgb" BOOLEAN NOT NULL,
    "bgbBericht" BOOLEAN NOT NULL,
    "ssa" BOOLEAN NOT NULL,
    "bericht" BOOLEAN NOT NULL,
    "umb" BOOLEAN NOT NULL,
    "ber" BOOLEAN NOT NULL,
    "reNr" TEXT NOT NULL,
    "reBetrag" DECIMAL(65,30) NOT NULL,
    "reErhalten" BOOLEAN NOT NULL,
    "reNr2" TEXT,
    "reBetrag2" DECIMAL(65,30),
    "reNr2Erhalten" BOOLEAN,
    "dateien" TEXT,
    "mahnung" BOOLEAN NOT NULL,
    "mahnung1" BOOLEAN NOT NULL,
    "mahnungErhaten" BOOLEAN NOT NULL,
    "auftraggeber" TEXT NOT NULL,
    "ap" TEXT NOT NULL,
    "strasse" TEXT NOT NULL,
    "plz" TEXT NOT NULL,
    "ort" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Auftrag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Nutzeinheit_SSTToTrinkwassererwaermer_SST" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "installationsauftrag_sst_auftragsstatusId_key" ON "installationsauftrag_sst"("auftragsstatusId");

-- CreateIndex
CREATE UNIQUE INDEX "auftragsstatus_sst_installationsauftragId_key" ON "auftragsstatus_sst"("installationsauftragId");

-- CreateIndex
CREATE UNIQUE INDEX "auftragsstatus_sst_abgeschlossenVertragspartnerId_key" ON "auftragsstatus_sst"("abgeschlossenVertragspartnerId");

-- CreateIndex
CREATE UNIQUE INDEX "probeentnahmestelle_sst_nutzeinheitId_key" ON "probeentnahmestelle_sst"("nutzeinheitId");

-- CreateIndex
CREATE UNIQUE INDEX "abgeschlossenvertragspartner_sst_auftragsstatusId_key" ON "abgeschlossenvertragspartner_sst"("auftragsstatusId");

-- CreateIndex
CREATE UNIQUE INDEX "abgeschlossenvertragspartner_sst_liegenschaftId_key" ON "abgeschlossenvertragspartner_sst"("liegenschaftId");

-- CreateIndex
CREATE UNIQUE INDEX "nutzeinheit_sst_gebaeudeId_key" ON "nutzeinheit_sst"("gebaeudeId");

-- CreateIndex
CREATE UNIQUE INDEX "nutzeinheit_sst_trinkwasseranlageId_key" ON "nutzeinheit_sst"("trinkwasseranlageId");

-- CreateIndex
CREATE UNIQUE INDEX "nutzeinheit_sst_probeEntnahmeStelleId_key" ON "nutzeinheit_sst"("probeEntnahmeStelleId");

-- CreateIndex
CREATE UNIQUE INDEX "gebaeude_sst_adresseId_key" ON "gebaeude_sst"("adresseId");

-- CreateIndex
CREATE UNIQUE INDEX "gebaeude_sst_nutzEinheitId_key" ON "gebaeude_sst"("nutzEinheitId");

-- CreateIndex
CREATE UNIQUE INDEX "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage__AB_unique" ON "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST"("A", "B");

-- CreateIndex
CREATE INDEX "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SS_B_index" ON "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Nutzeinheit_SSTToTrinkwassererwaermer_SST_AB_unique" ON "_Nutzeinheit_SSTToTrinkwassererwaermer_SST"("A", "B");

-- CreateIndex
CREATE INDEX "_Nutzeinheit_SSTToTrinkwassererwaermer_SST_B_index" ON "_Nutzeinheit_SSTToTrinkwassererwaermer_SST"("B");

-- AddForeignKey
ALTER TABLE "auftragsstatus_sst" ADD CONSTRAINT "auftragsstatus_sst_installationsauftragId_fkey" FOREIGN KEY ("installationsauftragId") REFERENCES "installationsauftrag_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leistungen_sst" ADD CONSTRAINT "leistungen_sst_leistungErbrachtInId_fkey" FOREIGN KEY ("leistungErbrachtInId") REFERENCES "gebaeude_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leistungen_sst" ADD CONSTRAINT "leistungen_sst_probeEntnahmeStelleId_fkey" FOREIGN KEY ("probeEntnahmeStelleId") REFERENCES "probeentnahmestelle_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leistungen_sst" ADD CONSTRAINT "leistungen_sst_abgeschlossenVertragspartnerId_fkey" FOREIGN KEY ("abgeschlossenVertragspartnerId") REFERENCES "abgeschlossenvertragspartner_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trinkwassererwaermer_sst" ADD CONSTRAINT "trinkwassererwaermer_sst_trinkwasseranlageId_fkey" FOREIGN KEY ("trinkwasseranlageId") REFERENCES "trinkwasseranlage_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "probeentnahmestelle_sst" ADD CONSTRAINT "probeentnahmestelle_sst_trinkwasseranlageId_fkey" FOREIGN KEY ("trinkwasseranlageId") REFERENCES "trinkwasseranlage_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "abgeschlossenvertragspartner_sst" ADD CONSTRAINT "abgeschlossenvertragspartner_sst_gesundheitsamtId_fkey" FOREIGN KEY ("gesundheitsamtId") REFERENCES "gesundheitsamt_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "abgeschlossenvertragspartner_sst" ADD CONSTRAINT "abgeschlossenvertragspartner_sst_auftragsstatusId_fkey" FOREIGN KEY ("auftragsstatusId") REFERENCES "auftragsstatus_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "abgeschlossenvertragspartner_sst" ADD CONSTRAINT "abgeschlossenvertragspartner_sst_liegenschaftId_fkey" FOREIGN KEY ("liegenschaftId") REFERENCES "liegenschaft_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutzeinheit_sst" ADD CONSTRAINT "nutzeinheit_sst_gebaeudeId_fkey" FOREIGN KEY ("gebaeudeId") REFERENCES "gebaeude_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutzeinheit_sst" ADD CONSTRAINT "nutzeinheit_sst_trinkwasseranlageId_fkey" FOREIGN KEY ("trinkwasseranlageId") REFERENCES "trinkwasseranlage_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutzeinheit_sst" ADD CONSTRAINT "nutzeinheit_sst_probeEntnahmeStelleId_fkey" FOREIGN KEY ("probeEntnahmeStelleId") REFERENCES "probeentnahmestelle_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "steigstrang" ADD CONSTRAINT "steigstrang_trinkwasserAnlageId_fkey" FOREIGN KEY ("trinkwasserAnlageId") REFERENCES "trinkwasseranlage_sst"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gebaeude_sst" ADD CONSTRAINT "gebaeude_sst_adresseId_fkey" FOREIGN KEY ("adresseId") REFERENCES "adresse_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adresse_sst" ADD CONSTRAINT "adresse_sst_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "druckstucke_sst" ADD CONSTRAINT "druckstucke_sst_gelieferteDruckstueckeId_fkey" FOREIGN KEY ("gelieferteDruckstueckeId") REFERENCES "abgeschlossenvertragspartner_sst"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST" ADD CONSTRAINT "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST_A_fkey" FOREIGN KEY ("A") REFERENCES "abgeschlossenvertragspartner_sst"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST" ADD CONSTRAINT "_AbgeschlossenVertragspartner_SSTToTrinkwasseranlage_SST_B_fkey" FOREIGN KEY ("B") REFERENCES "trinkwasseranlage_sst"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Nutzeinheit_SSTToTrinkwassererwaermer_SST" ADD CONSTRAINT "_Nutzeinheit_SSTToTrinkwassererwaermer_SST_A_fkey" FOREIGN KEY ("A") REFERENCES "nutzeinheit_sst"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Nutzeinheit_SSTToTrinkwassererwaermer_SST" ADD CONSTRAINT "_Nutzeinheit_SSTToTrinkwassererwaermer_SST_B_fkey" FOREIGN KEY ("B") REFERENCES "trinkwassererwaermer_sst"("id") ON DELETE CASCADE ON UPDATE CASCADE;
