-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Biodata" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "fatherNik" TEXT NOT NULL,
    "fatherBirthdate" TIMESTAMP(3) NOT NULL,
    "fatherOccupation" TEXT NOT NULL,
    "fatherEducation" TEXT NOT NULL,
    "fatherSalary" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "motherNik" TEXT NOT NULL,
    "motherBirthdate" TIMESTAMP(3) NOT NULL,
    "motherOccupation" TEXT NOT NULL,
    "motherEducation" TEXT NOT NULL,
    "motherSalary" TEXT NOT NULL,
    "schoolOrigin" TEXT NOT NULL,
    "departent" TEXT NOT NULL,
    "receipt" TEXT NOT NULL,

    CONSTRAINT "Biodata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Biodata_userId_key" ON "Biodata"("userId");

-- AddForeignKey
ALTER TABLE "Biodata" ADD CONSTRAINT "Biodata_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
