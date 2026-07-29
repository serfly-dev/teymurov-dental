/*
  Warnings:

  - You are about to drop the column `name` on the `ServicePrice` table. All the data in the column will be lost.
  - You are about to drop the column `priceFrom` on the `ServicePrice` table. All the data in the column will be lost.
  - You are about to drop the column `priceTo` on the `ServicePrice` table. All the data in the column will be lost.
  - Added the required column `price` to the `ServicePrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `ServicePrice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServicePrice" DROP COLUMN "name",
DROP COLUMN "priceFrom",
DROP COLUMN "priceTo",
ADD COLUMN     "oldPrice" DECIMAL(10,2),
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
