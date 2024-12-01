'use server';

import { prismaClient } from '@/lib/prisma-client';

interface getJadwalCountPayload {
  email: string;
}

export const getJadwalCount = async (
  payload: getJadwalCountPayload
): Promise<number> => {
  return await prismaClient.jadwal.count({
    where: {
      dosen: {
        email: payload.email,
      },
    },
  });
};
