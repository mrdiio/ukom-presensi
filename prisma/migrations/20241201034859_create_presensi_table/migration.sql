-- CreateTable
CREATE TABLE "Presensi" (
    "id" TEXT NOT NULL,
    "jadwalId" TEXT NOT NULL,
    "dosensId" TEXT NOT NULL,
    "waktuMulai" TIMESTAMP(3) NOT NULL,
    "waktuSelesai" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Presensi_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Presensi" ADD CONSTRAINT "Presensi_jadwalId_fkey" FOREIGN KEY ("jadwalId") REFERENCES "Jadwal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presensi" ADD CONSTRAINT "Presensi_dosensId_fkey" FOREIGN KEY ("dosensId") REFERENCES "dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
