export function convertIsoTime(isoTime: string, utcNumber: number): string {
  if (!isoTime || typeof isoTime !== 'string') {
    throw new Error('Invalid input: isoTime must be a non-empty string');
  }

  const date = new Date(isoTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid ISO time string');
  }

  const utcOffset = utcNumber * 60 * 60 * 1000; // convert hours to milliseconds
  const localTime = new Date(date.getTime() + utcOffset);

  const hours = localTime.getHours().toString().padStart(2, '0');
  const minutes = localTime.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}
