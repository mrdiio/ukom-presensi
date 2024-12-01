'use server';

import { prismaClient } from '@/lib/prisma-client';

interface getPresensiCountPayload {
  email: string;
}

export const getPresensiCount = async (
  payload: getPresensiCountPayload
): Promise<number> => {
  return await prismaClient.presensi.count({
    where: {
      dosens: {
        email: payload.email,
      },
    },
  });
};
