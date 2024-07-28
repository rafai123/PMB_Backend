/*
  Warnings:

  - Added the required column `birthPlace` to the `Biodata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Biodata" ADD COLUMN     "birthPlace" TEXT NOT NULL;
