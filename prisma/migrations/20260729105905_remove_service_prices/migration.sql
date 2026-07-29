/*
  Warnings:

  - You are about to drop the `ServicePrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServicePrice" DROP CONSTRAINT "ServicePrice_serviceId_fkey";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "price" TEXT;

-- DropTable
DROP TABLE "ServicePrice";
