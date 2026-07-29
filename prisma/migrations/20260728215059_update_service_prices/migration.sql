/*
  Warnings:

  - You are about to drop the column `oldPrice` on the `ServicePrice` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `ServicePrice` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ServicePrice` table. All the data in the column will be lost.
  - Added the required column `name` to the `ServicePrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceFrom` to the `ServicePrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServicePrice" DROP COLUMN "oldPrice",
DROP COLUMN "price",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "priceFrom" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "priceTo" DECIMAL(10,2);
