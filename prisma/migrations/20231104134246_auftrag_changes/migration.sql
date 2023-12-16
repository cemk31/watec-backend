-- DropForeignKey
ALTER TABLE "auftraggeber" DROP CONSTRAINT "auftraggeber_userId_fkey";

-- AlterTable
ALTER TABLE "auftraggeber" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "ap" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "ort" DROP NOT NULL,
ALTER COLUMN "plz" DROP NOT NULL,
ALTER COLUMN "strasse" DROP NOT NULL,
ALTER COLUMN "tel" DROP NOT NULL,
ALTER COLUMN "auftraggebername" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "auftraggeber" ADD CONSTRAINT "auftraggeber_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
