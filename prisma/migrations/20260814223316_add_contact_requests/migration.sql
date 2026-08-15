-- CreateEnum
CREATE TYPE "ContactRequestType" AS ENUM ('APPOINTMENT', 'QUESTION');

-- CreateEnum
CREATE TYPE "ContactRequestStatus" AS ENUM ('NEW', 'CALLED', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "CallbackTime" AS ENUM ('MORNING', 'BEFORE_NOON', 'AFTERNOON', 'EVENING', 'ANYTIME');

-- CreateTable
CREATE TABLE "ContactRequest" (
    "id" TEXT NOT NULL,
    "type" "ContactRequestType" NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "callbackTime" "CallbackTime" NOT NULL,
    "serviceId" TEXT,
    "comment" TEXT,
    "status" "ContactRequestStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactRequest_status_idx" ON "ContactRequest"("status");

-- CreateIndex
CREATE INDEX "ContactRequest_type_idx" ON "ContactRequest"("type");

-- CreateIndex
CREATE INDEX "ContactRequest_createdAt_idx" ON "ContactRequest"("createdAt");

-- CreateIndex
CREATE INDEX "ContactRequest_serviceId_idx" ON "ContactRequest"("serviceId");

-- AddForeignKey
ALTER TABLE "ContactRequest" ADD CONSTRAINT "ContactRequest_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
