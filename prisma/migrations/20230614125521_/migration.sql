/*
  Warnings:

  - Added the required column `ap` to the `adresse_sst` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "adresse_sst" ADD COLUMN     "ap" TEXT NOT NULL;
