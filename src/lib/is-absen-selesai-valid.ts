export function isAbsenSelesaiValid(params: {
  currentTime: string;
  date: string;
  jamSelesai: string;
}): boolean {
  const { currentTime, date, jamSelesai } = params;

  const currentDateTime = new Date(currentTime);
  const targetDate = new Date(date);
  const jamSelesaiDateTime = new Date(`${date}T${jamSelesai}`);

  if (currentDateTime.toDateString() !== targetDate.toDateString()) {
    return false;
  }

  const tenMinutesBefore = new Date(
    jamSelesaiDateTime.getTime() - 10 * 60 * 1000
  );
  const tenMinutesAfter = new Date(
    jamSelesaiDateTime.getTime() + 10 * 60 * 1000
  );

  return (
    currentDateTime >= tenMinutesBefore && currentDateTime <= tenMinutesAfter
  );
}
