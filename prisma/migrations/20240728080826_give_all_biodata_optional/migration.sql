/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Biodata" ALTER COLUMN "fullName" DROP NOT NULL,
ALTER COLUMN "nisn" DROP NOT NULL,
ALTER COLUMN "nik" DROP NOT NULL,
ALTER COLUMN "birthDate" DROP NOT NULL,
ALTER COLUMN "nationality" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "fatherName" DROP NOT NULL,
ALTER COLUMN "fatherNik" DROP NOT NULL,
ALTER COLUMN "fatherBirthdate" DROP NOT NULL,
ALTER COLUMN "fatherOccupation" DROP NOT NULL,
ALTER COLUMN "fatherEducation" DROP NOT NULL,
ALTER COLUMN "fatherSalary" DROP NOT NULL,
ALTER COLUMN "motherName" DROP NOT NULL,
ALTER COLUMN "motherNik" DROP NOT NULL,
ALTER COLUMN "motherBirthdate" DROP NOT NULL,
ALTER COLUMN "motherOccupation" DROP NOT NULL,
ALTER COLUMN "motherEducation" DROP NOT NULL,
ALTER COLUMN "motherSalary" DROP NOT NULL,
ALTER COLUMN "schoolOrigin" DROP NOT NULL,
ALTER COLUMN "receipt" DROP NOT NULL,
ALTER COLUMN "department" DROP NOT NULL,
ALTER COLUMN "departmentTime" DROP NOT NULL,
ALTER COLUMN "schoolOriginAddress" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "birthPlace" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "anotherfile" DROP NOT NULL,
ALTER COLUMN "ijazah" DROP NOT NULL,
ALTER COLUMN "kartukeluarga" DROP NOT NULL,
ALTER COLUMN "ktp" DROP NOT NULL,
ALTER COLUMN "sktl" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Document_userId_key" ON "Document"("userId");
