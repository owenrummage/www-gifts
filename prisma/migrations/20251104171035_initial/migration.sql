-- CreateTable
CREATE TABLE "Gift" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "rating" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "reservedBy" TEXT,
    "reservedAt" TIMESTAMP(3),

    CONSTRAINT "Gift_pkey" PRIMARY KEY ("id")
);
