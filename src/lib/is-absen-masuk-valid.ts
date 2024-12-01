import { Hari } from '@prisma/client';

export function isAbsenMulaiValid(params: {
  hari: Hari;
  jamMulai: Date;
  jamSelesai: Date;
}): boolean {
  const currentTime = new Date();
  const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
  const { jamMulai, hari, jamSelesai } = params;

  const currentDay = days[currentTime.getDay()];

  if (hari !== currentDay) {
    return false;
  }

  const currentformattedDate = currentTime.toISOString().split('T')[0];
  const jamMulaiConverted = jamMulai.toTimeString().split(' ')[0];
  const jamSelesaiConverted = jamSelesai.toTimeString().split(' ')[0];

  const unixTimeJamMulai = new Date(
    `${currentformattedDate} ${jamMulaiConverted}`
  ).getTime();
  const unixTimeJamSelesai = new Date(
    `${currentformattedDate} ${jamSelesaiConverted}`
  ).getTime();
  const unixTimeCurrentTime = currentTime.getTime();

  const tenMinutesInMilliseconds = 10 * 60 * 1000;

  if (
    unixTimeCurrentTime >= unixTimeJamMulai - tenMinutesInMilliseconds && // 10 minutes before jamMulai
    unixTimeCurrentTime <= unixTimeJamSelesai + tenMinutesInMilliseconds // 10 minutes after jamSelesai
  ) {
    return true;
  }

  return false;
}
