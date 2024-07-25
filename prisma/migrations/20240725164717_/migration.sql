/*
  Warnings:

  - You are about to drop the column `type` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Document` table. All the data in the column will be lost.
  - Added the required column `anotherfile` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ijazah` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kartukeluarga` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ktp` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sktl` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" DROP COLUMN "type",
DROP COLUMN "url",
ADD COLUMN     "anotherfile" TEXT NOT NULL,
ADD COLUMN     "ijazah" TEXT NOT NULL,
ADD COLUMN     "kartukeluarga" TEXT NOT NULL,
ADD COLUMN     "ktp" TEXT NOT NULL,
ADD COLUMN     "sktl" TEXT NOT NULL;
