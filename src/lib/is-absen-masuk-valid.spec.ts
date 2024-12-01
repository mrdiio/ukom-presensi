import { isAbsenMulaiValid } from './is-absen-masuk-valid';

describe('isAbsenMulaiValid', () => {
  it('should return true if currentTime is within 10 minutes before jamMulai', () => {
    const params = {
      currentTime: '2023-10-01T08:50:00Z',
      date: '2023-10-01',
      jamMulai: '2023-10-01T09:00:00Z',
    };
    expect(isAbsenMulaiValid(params)).toBe(true);
  });

  it('should return false if currentTime is after jamMulai', () => {
    const params = {
      currentTime: '2023-10-01T09:01:00Z',
      date: '2023-10-01',
      jamMulai: '2023-10-01T09:00:00Z',
    };
    expect(isAbsenMulaiValid(params)).toBe(false);
  });

  it('should return false if currentTime is more than 10 minutes before jamMulai', () => {
    const params = {
      currentTime: '2023-10-01T08:49:00Z',
      date: '2023-10-01',
      jamMulai: '2023-10-01T09:00:00Z',
    };
    expect(isAbsenMulaiValid(params)).toBe(false);
  });

  it('should return false if currentTime is on a different date than date', () => {
    const params = {
      currentTime: '2023-10-02T08:50:00Z',
      date: '2023-10-01',
      jamMulai: '2023-10-01T09:00:00Z',
    };
    expect(isAbsenMulaiValid(params)).toBe(false);
  });

  it('should return true if currentTime is exactly jamMulai', () => {
    const params = {
      currentTime: '2023-10-01T09:00:00Z',
      date: '2023-10-01',
      jamMulai: '2023-10-01T09:00:00Z',
    };
    expect(isAbsenMulaiValid(params)).toBe(true);
  });

  it('should return true if currentTime is exactly 10 minutes before jamMulai', () => {
    const params = {
      currentTime: '2023-10-01T08:50:00Z',
      date: '2023-10-01',
      jamMulai: '2023-10-01T09:00:00Z',
    };
    expect(isAbsenMulaiValid(params)).toBe(true);
  });
});
