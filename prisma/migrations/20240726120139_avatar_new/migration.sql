/*
  Warnings:

  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "avatar" SET DEFAULT 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Davatars&psig=AOvVaw0mpOpnR_2QuVHb8OTGD2FS&ust=1722081603061000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMDw_YTUxIcDFQAAAAAdAAAAABAE';
