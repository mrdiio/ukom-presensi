export function convertDate(isoTime: string, utcNumber: number): string {
  const date = new Date(isoTime);
  date.setUTCMinutes(date.getUTCMinutes() + utcNumber);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
