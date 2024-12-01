'use server';

import { prismaClient } from '@/lib/prisma-client';

interface getJadwalMataKuliahPayload {
  email: string;
}

export const getJadwalMataKuliah = async (
  payload: getJadwalMataKuliahPayload
) => {
  const data = await prismaClient.jadwal.findMany({
    where: {
      dosen: {
        email: payload.email,
      },
    },
    include: {
      mataKuliah: true,
      Presensi: true,
    },
  });

  const dataMap = data.map((item) => {
    return {
      id: item.id,
      kodeMatakuliah: item.mataKuliah.kode,
      nama: item.mataKuliah.nama,
      sks: item.mataKuliah.sks,
      jenis: item.mataKuliah.jenis,
      jamMulai: item.jamMulai,
      jamSelesai: item.jamSelesai,
      hari: item.hari,
      tanggal: item.tanggal,
      absenMulai: item.Presensi?.[0]?.waktuMulai,
      absenSelesai: item.Presensi?.[0]?.waktuSelesai,
    };
  });

  return dataMap;
};
