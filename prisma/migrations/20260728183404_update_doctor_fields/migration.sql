/*
  Warnings:

  - You are about to drop the column `experience` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `specialization` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "experience",
DROP COLUMN "position",
ADD COLUMN     "careerStartYear" INTEGER,
ADD COLUMN     "specialization" TEXT NOT NULL;
