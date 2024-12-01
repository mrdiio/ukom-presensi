'use server';

import { isAbsenSelesaiValid } from '@/lib/is-absen-selesai-valid';
import { prismaClient } from '@/lib/prisma-client';
import { Hari } from '@prisma/client';

interface PostPresensiPayload {
  email: string;
  jadwalId: string;
  jamSelesai: string;
}

export async function postPresensiSelesai(payload: PostPresensiPayload) {
  try {
    const jadwal = await prismaClient.jadwal.findUnique({
      where: {
        id: payload.jadwalId,
      },
    });

    const isValid = isAbsenSelesaiValid({
      jamMulai: jadwal?.jamMulai as Date,
      jamSelesai: jadwal?.jamSelesai as Date,
      hari: jadwal?.hari as Hari,
    });

    if (!isValid) {
      throw new Error('Invalid absen selesai');
    }

    const dosen = await prismaClient.dosen.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!dosen) {
      throw new Error('Dosen not found');
    }

    const presensi = await prismaClient.presensi.findFirst({
      where: {
        jadwalId: payload.jadwalId,
        waktuSelesai: null,
      },
    });

    if (presensi?.waktuSelesai) {
      throw new Error('Presensi already finished');
    }

    const updatedPresensi = await prismaClient.presensi.update({
      where: {
        id: `${presensi?.id}`,
      },
      data: {
        waktuSelesai: new Date(payload.jamSelesai),
      },
    });
    return updatedPresensi;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Failed to post presensi selesai: ${error.message}`);
  }
}
