-- CreateEnum
CREATE TYPE "Jenis" AS ENUM ('TEORI', 'PRAKTIKUM');

-- CreateTable
CREATE TABLE "matakuliah" (
    "id" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "sks" INTEGER NOT NULL,
    "jenis" "Jenis" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matakuliah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "matakuliah_kode_key" ON "matakuliah"("kode");
