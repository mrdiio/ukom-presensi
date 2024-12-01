import { convertIsoTime } from './convert-iso-time';

describe('convertIsoTime', () => {
  it('should convert ISO time to local time with positive UTC offset', () => {
    const isoTime = '2023-10-01T12:00:00Z';
    const utcNumber = 2;
    const expectedDate = new Date('2023-10-01T14:00:00Z');
    const result = convertIsoTime(isoTime, utcNumber);
    expect(result).toEqual(expectedDate);
  });

  it('should convert ISO time to local time with negative UTC offset', () => {
    const isoTime = '2023-10-01T12:00:00Z';
    const utcNumber = -3;
    const expectedDate = new Date('2023-10-01T09:00:00Z');
    const result = convertIsoTime(isoTime, utcNumber);
    expect(result).toEqual(expectedDate);
  });

  it('should handle zero UTC offset', () => {
    const isoTime = '2023-10-01T12:00:00Z';
    const utcNumber = 0;
    const expectedDate = new Date('2023-10-01T12:00:00Z');
    const result = convertIsoTime(isoTime, utcNumber);
    expect(result).toEqual(expectedDate);
  });

  it('should handle invalid ISO time', () => {
    const isoTime = 'invalid-date';
    const utcNumber = 2;
    expect(() => convertIsoTime(isoTime, utcNumber)).toThrow();
  });
});
