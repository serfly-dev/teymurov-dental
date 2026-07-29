-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "duration" TEXT,
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "seoKeywords" TEXT;

-- CreateTable
CREATE TABLE "ServiceBlock" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ServiceBlock_serviceId_idx" ON "ServiceBlock"("serviceId");

-- AddForeignKey
ALTER TABLE "ServiceBlock" ADD CONSTRAINT "ServiceBlock_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
