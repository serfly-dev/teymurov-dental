-- CreateTable
CREATE TABLE "DoctorCertificate" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "year" INTEGER,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DoctorCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DoctorCertificate_doctorId_idx" ON "DoctorCertificate"("doctorId");

-- AddForeignKey
ALTER TABLE "DoctorCertificate" ADD CONSTRAINT "DoctorCertificate_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
