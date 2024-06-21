-- CreateTable
CREATE TABLE "number" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uppdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "number_pkey" PRIMARY KEY ("id")
);
