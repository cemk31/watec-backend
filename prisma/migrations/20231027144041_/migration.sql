/*
  Warnings:

  - You are about to drop the column `adresseLi` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `agInformiert` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `anfrageBestatigt` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `anfrageThema` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `angebot` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `angebotErstellt` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `angebotsnummer` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `ap` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `auftragbestatigung` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `auftraggeber` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `aushang` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `ber` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `bericht` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `bestatigungVersendet` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `bgb` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `bgbBericht` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `dateien` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `datumAushang` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `emailAnhang` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `emailBetreff` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `liNr` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `mahnung` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `mahnung1` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `mahnungErhaten` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `mailadresseVw` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `ort` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `ortLi` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `plz` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `plzLi` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `reBetrag` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `reBetrag2` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `reErhalten` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `reNr` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `reNr2` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `reNr2Erhalten` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `ssa` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `strasse` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `tel` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `telVw` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `terminiertZum` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `uhrzeit` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `umb` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `vwBestatigung` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `vwBuro` on the `auftraege` table. All the data in the column will be lost.
  - You are about to drop the column `vwMa` on the `auftraege` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailId]` on the table `auftraege` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[objektId]` on the table `auftraege` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "auftraege" DROP COLUMN "adresseLi",
DROP COLUMN "agInformiert",
DROP COLUMN "anfrageBestatigt",
DROP COLUMN "anfrageThema",
DROP COLUMN "angebot",
DROP COLUMN "angebotErstellt",
DROP COLUMN "angebotsnummer",
DROP COLUMN "ap",
DROP COLUMN "auftragbestatigung",
DROP COLUMN "auftraggeber",
DROP COLUMN "aushang",
DROP COLUMN "ber",
DROP COLUMN "bericht",
DROP COLUMN "bestatigungVersendet",
DROP COLUMN "bgb",
DROP COLUMN "bgbBericht",
DROP COLUMN "dateien",
DROP COLUMN "datumAushang",
DROP COLUMN "email",
DROP COLUMN "emailAnhang",
DROP COLUMN "emailBetreff",
DROP COLUMN "liNr",
DROP COLUMN "mahnung",
DROP COLUMN "mahnung1",
DROP COLUMN "mahnungErhaten",
DROP COLUMN "mailadresseVw",
DROP COLUMN "ort",
DROP COLUMN "ortLi",
DROP COLUMN "plz",
DROP COLUMN "plzLi",
DROP COLUMN "reBetrag",
DROP COLUMN "reBetrag2",
DROP COLUMN "reErhalten",
DROP COLUMN "reNr",
DROP COLUMN "reNr2",
DROP COLUMN "reNr2Erhalten",
DROP COLUMN "ssa",
DROP COLUMN "strasse",
DROP COLUMN "tel",
DROP COLUMN "telVw",
DROP COLUMN "terminiertZum",
DROP COLUMN "uhrzeit",
DROP COLUMN "umb",
DROP COLUMN "vwBestatigung",
DROP COLUMN "vwBuro",
DROP COLUMN "vwMa",
ADD COLUMN     "auftraggeberId" INTEGER,
ADD COLUMN     "emailId" INTEGER,
ADD COLUMN     "objektId" INTEGER,
ADD COLUMN     "vsDynamischId" INTEGER,
ADD COLUMN     "vsStatischId" INTEGER;

-- CreateTable
CREATE TABLE "email" (
    "id" SERIAL NOT NULL,
    "emailBetreff" TEXT,
    "emailAnhang" TEXT,
    "bestatigungVersendet" BOOLEAN,
    "anfrageThema" TEXT,
    "anfrageBestatigt" BOOLEAN,
    "angebotErstellt" BOOLEAN,
    "angebotsnummer" TEXT,
    "angebot" TEXT,

    CONSTRAINT "email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objekt" (
    "id" SERIAL NOT NULL,
    "liNr" TEXT,
    "adresseLi" TEXT,
    "plzLi" TEXT,
    "ortLi" TEXT,

    CONSTRAINT "objekt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vw" (
    "id" SERIAL NOT NULL,
    "vwBuro" TEXT,
    "vwMa" TEXT,
    "mailadresseVw" TEXT,
    "telVw" TEXT,

    CONSTRAINT "vw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auftragsbestaetigung" (
    "id" SERIAL NOT NULL,
    "auftragbestatigung" BOOLEAN,
    "vwBestatigung" TEXT,
    "terminiertZum" TIMESTAMP(3),
    "uhrzeit" TIMESTAMP(3),
    "aushang" BOOLEAN,
    "datumAushang" TIMESTAMP(3),
    "agInformiert" BOOLEAN,
    "bgb" BOOLEAN,
    "bgbBericht" BOOLEAN,
    "ssa" BOOLEAN,
    "bericht" BOOLEAN,
    "umb" BOOLEAN,
    "ber" BOOLEAN,
    "reNr" TEXT,
    "reBetrag" DECIMAL(65,30),
    "reErhalten" BOOLEAN,
    "reNr2" TEXT,
    "reBetrag2" DECIMAL(65,30),
    "reNr2Erhalten" BOOLEAN,
    "dateien" TEXT,
    "mahnung" BOOLEAN,
    "mahnung1" BOOLEAN,
    "mahnungErhaten" BOOLEAN,
    "auftragId" INTEGER,

    CONSTRAINT "auftragsbestaetigung_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auftragsbestaetigung_auftragId_key" ON "auftragsbestaetigung"("auftragId");

-- CreateIndex
CREATE UNIQUE INDEX "auftraege_emailId_key" ON "auftraege"("emailId");

-- CreateIndex
CREATE UNIQUE INDEX "auftraege_objektId_key" ON "auftraege"("objektId");

-- AddForeignKey
ALTER TABLE "auftraege" ADD CONSTRAINT "auftraege_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "email"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftraege" ADD CONSTRAINT "auftraege_objektId_fkey" FOREIGN KEY ("objektId") REFERENCES "objekt"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftraege" ADD CONSTRAINT "auftraege_auftraggeberId_fkey" FOREIGN KEY ("auftraggeberId") REFERENCES "auftraggeber"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftraege" ADD CONSTRAINT "auftraege_vsStatischId_fkey" FOREIGN KEY ("vsStatischId") REFERENCES "vw"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftraege" ADD CONSTRAINT "auftraege_vsDynamischId_fkey" FOREIGN KEY ("vsDynamischId") REFERENCES "vw"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auftragsbestaetigung" ADD CONSTRAINT "auftragsbestaetigung_auftragId_fkey" FOREIGN KEY ("auftragId") REFERENCES "auftraege"("id") ON DELETE SET NULL ON UPDATE CASCADE;
