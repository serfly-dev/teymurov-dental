-- CreateEnum
CREATE TYPE "ServiceListType" AS ENUM ('BENEFIT', 'INDICATION', 'CONTRAINDICATION', 'RECOMMENDATION', 'STAGE');

-- CreateTable
CREATE TABLE "ServiceList" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "type" "ServiceListType" NOT NULL,
    "title" TEXT,
    "text" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ServiceList" ADD CONSTRAINT "ServiceList_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
