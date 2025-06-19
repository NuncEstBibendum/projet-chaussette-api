/*
  Warnings:

  - Added the required column `birthDate` to the `Children` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Children` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Children" ADD COLUMN     "birthDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL;
