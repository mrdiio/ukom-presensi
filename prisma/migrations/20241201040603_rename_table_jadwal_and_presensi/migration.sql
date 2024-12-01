/*
  Warnings:

  - You are about to drop the `Jadwal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Presensi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Jadwal" DROP CONSTRAINT "Jadwal_dosenId_fkey";

-- DropForeignKey
ALTER TABLE "Jadwal" DROP CONSTRAINT "Jadwal_mataKuliahId_fkey";

-- DropForeignKey
ALTER TABLE "Presensi" DROP CONSTRAINT "Presensi_dosensId_fkey";

-- DropForeignKey
ALTER TABLE "Presensi" DROP CONSTRAINT "Presensi_jadwalId_fkey";

-- DropTable
DROP TABLE "Jadwal";

-- DropTable
DROP TABLE "Presensi";

-- CreateTable
CREATE TABLE "jadwal" (
    "id" TEXT NOT NULL,
    "dosenId" TEXT NOT NULL,
    "mataKuliahId" TEXT NOT NULL,
    "hari" "Hari" NOT NULL,
    "jamMulai" TIMESTAMP(3) NOT NULL,
    "jamSelesai" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jadwal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presensi" (
    "id" TEXT NOT NULL,
    "jadwalId" TEXT NOT NULL,
    "dosensId" TEXT NOT NULL,
    "waktuMulai" TIMESTAMP(3) NOT NULL,
    "waktuSelesai" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "presensi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "jadwal" ADD CONSTRAINT "jadwal_dosenId_fkey" FOREIGN KEY ("dosenId") REFERENCES "dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jadwal" ADD CONSTRAINT "jadwal_mataKuliahId_fkey" FOREIGN KEY ("mataKuliahId") REFERENCES "matakuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presensi" ADD CONSTRAINT "presensi_jadwalId_fkey" FOREIGN KEY ("jadwalId") REFERENCES "jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presensi" ADD CONSTRAINT "presensi_dosensId_fkey" FOREIGN KEY ("dosensId") REFERENCES "dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
