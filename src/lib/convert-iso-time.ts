export function convertIsoTime(isoTime: string, utcNumber: number): Date {
  if (!isoTime || typeof isoTime !== 'string') {
    throw new Error('Invalid input: isoTime must be a non-empty string');
  }

  const date = new Date(isoTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid ISO time string');
  }

  const utcOffset = utcNumber * 60 * 60 * 1000; // convert hours to milliseconds
  const localTime = new Date(date.getTime() + utcOffset);
  return localTime;
}
