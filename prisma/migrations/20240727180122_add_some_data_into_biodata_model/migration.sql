/*
  Warnings:

  - You are about to drop the column `departent` on the `Biodata` table. All the data in the column will be lost.
  - Added the required column `department` to the `Biodata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departmentTime` to the `Biodata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schoolOriginAddress` to the `Biodata` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Biodata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Biodata" DROP COLUMN "departent",
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "departmentTime" TEXT NOT NULL,
ADD COLUMN     "schoolGraduateYear" TEXT NOT NULL DEFAULT 'Unknown',
ADD COLUMN     "schoolOriginAddress" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
