'use server';

import { isAbsenMulaiValid } from '@/lib/is-absen-masuk-valid';
import { prismaClient } from '@/lib/prisma-client';
import { Hari } from '@prisma/client';

interface PostPresensiPayload {
  email: string;
  jadwalId: string;
  jamMulai: string;
}

export async function postPresensiMulai(payload: PostPresensiPayload) {
  try {
    const jadwal = await prismaClient.jadwal.findUnique({
      where: {
        id: payload.jadwalId,
      },
    });

    const isValid = isAbsenMulaiValid({
      jamMulai: jadwal?.jamMulai as Date,
      jamSelesai: jadwal?.jamSelesai as Date,
      hari: jadwal?.hari as Hari,
    });

    if (!isValid) {
      throw new Error('Invalid absen masuk');
    }

    const dosen = await prismaClient.dosen.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!dosen) {
      throw new Error('Dosen not found');
    }

    const presensi = await prismaClient.presensi.create({
      data: {
        dosensId: dosen.id,
        jadwalId: payload.jadwalId,
        waktuMulai: new Date(payload.jamMulai),
      },
    });
    return presensi;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(`Failed to post presensi mulai: ${error.message}`);
  }
}
