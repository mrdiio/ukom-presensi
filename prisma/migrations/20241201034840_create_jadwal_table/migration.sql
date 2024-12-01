-- CreateEnum
CREATE TYPE "Hari" AS ENUM ('SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT');

-- CreateTable
CREATE TABLE "Jadwal" (
    "id" TEXT NOT NULL,
    "dosenId" TEXT NOT NULL,
    "mataKuliahId" TEXT NOT NULL,
    "hari" "Hari" NOT NULL,
    "jamMulai" TIMESTAMP(3) NOT NULL,
    "jamSelesai" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jadwal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_dosenId_fkey" FOREIGN KEY ("dosenId") REFERENCES "dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jadwal" ADD CONSTRAINT "Jadwal_mataKuliahId_fkey" FOREIGN KEY ("mataKuliahId") REFERENCES "matakuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
