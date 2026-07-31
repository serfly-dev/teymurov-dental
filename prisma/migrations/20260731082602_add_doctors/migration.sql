-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "experience" TEXT,
ADD COLUMN     "photo" TEXT;

-- CreateIndex
CREATE INDEX "Doctor_sortOrder_idx" ON "Doctor"("sortOrder");
