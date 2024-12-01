export function isAbsenMulaiValid(params: {
  currentTime: string;
  date: string;
  jamMulai: string;
}): boolean {
  const { currentTime, date, jamMulai } = params;

  const currentDate = new Date(currentTime).toISOString().split('T')[0];
  if (currentDate !== date) {
    return false;
  }

  const currentTimeDate = new Date(currentTime);
  const jamMulaiDate = new Date(jamMulai);
  const tenMinutesBeforeJamMulai = new Date(
    jamMulaiDate.getTime() - 10 * 60 * 1000
  );

  return (
    currentTimeDate <= jamMulaiDate &&
    currentTimeDate >= tenMinutesBeforeJamMulai
  );
}
