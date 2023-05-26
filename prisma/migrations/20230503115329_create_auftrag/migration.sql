/*
  Warnings:

  - You are about to drop the `Auftrag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Auftrag";

-- CreateTable
CREATE TABLE "auftraege" (
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
    "userId" INTEGER NOT NULL,

    CONSTRAINT "auftraege_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "auftraege" ADD CONSTRAINT "auftraege_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
