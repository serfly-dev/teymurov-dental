-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "experience" INTEGER,
    "education" TEXT,
    "biography" TEXT,
    "h1" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_slug_key" ON "Doctor"("slug");

-- CreateIndex
CREATE INDEX "Doctor_slug_idx" ON "Doctor"("slug");

-- CreateIndex
CREATE INDEX "Doctor_isPublished_idx" ON "Doctor"("isPublished");
