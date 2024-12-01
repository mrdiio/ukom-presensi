import { Hari } from '@prisma/client';

export function isAbsenSelesaiValid(params: {
  hari: Hari;
  jamMulai: Date;
  jamSelesai: Date;
}): boolean {
  const { jamSelesai, hari, jamMulai } = params;

  if (!jamMulai) {
    // return false;
  }
  const currentTime = new Date();

  const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];

  const currentDay = days[currentTime.getDay()];

  if (hari !== currentDay) {
    return false;
  }

  const jamSelesaiConverted = jamSelesai.toTimeString().split(' ')[0];
  const currentformattedDate = currentTime.toISOString().split('T')[0];

  const unixTimeJamSelesai = new Date(
    `${currentformattedDate} ${jamSelesaiConverted}`
  ).getTime();
  const unixTimeCurrentTime = currentTime.getTime();

  const tenMinutesInMilliseconds = 10 * 60 * 1000;

  if (
    unixTimeCurrentTime >= unixTimeJamSelesai - tenMinutesInMilliseconds && // 10 minutes before jamSelesai
    unixTimeCurrentTime <= unixTimeJamSelesai + tenMinutesInMilliseconds // 10 minutes after jamSelesai
  ) {
    return true;
  }

  return false;
}
