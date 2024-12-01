import { isAbsenSelesaiValid } from './is-absen-selesai-valid';

describe('isAbsenSelesaiValid', () => {
  it('should return true if currentTime is within 10 minutes before and after jamSelesai', () => {
    const params = {
      currentTime: '2023-10-01T10:05:00',
      date: '2023-10-01',
      jamSelesai: '10:00:00',
    };
    expect(isAbsenSelesaiValid(params)).toBe(true);
  });

  it('should return false if currentTime is more than 10 minutes before jamSelesai', () => {
    const params = {
      currentTime: '2023-10-01T09:45:00',
      date: '2023-10-01',
      jamSelesai: '10:00:00',
    };
    expect(isAbsenSelesaiValid(params)).toBe(false);
  });

  it('should return false if currentTime is more than 10 minutes after jamSelesai', () => {
    const params = {
      currentTime: '2023-10-01T10:15:01',
      date: '2023-10-01',
      jamSelesai: '10:00:00',
    };
    expect(isAbsenSelesaiValid(params)).toBe(false);
  });

  it('should return false if currentTime is on a different date than the target date', () => {
    const params = {
      currentTime: '2023-10-02T10:00:00',
      date: '2023-10-01',
      jamSelesai: '10:00:00',
    };
    expect(isAbsenSelesaiValid(params)).toBe(false);
  });

  it('should return true if currentTime is exactly at jamSelesai', () => {
    const params = {
      currentTime: '2023-10-01T10:00:00',
      date: '2023-10-01',
      jamSelesai: '10:00:00',
    };
    expect(isAbsenSelesaiValid(params)).toBe(true);
  });
});
