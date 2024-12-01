import { isAbsenMulaiValid } from './is-absen-masuk-valid';

describe('isAbsenMulaiValid', () => {
  it('should return true if currentTime is within 10 minutes before jamMulai', () => {
    const params = {
      currentTime: '2024-12-01T10:54:00.925Z',
      date: 'Sun Dec 01 2024 07:00:00 GMT+0700 (Western Indonesia Time)',
      jamMulai: 'Thu Jan 01 1970 10:40:00 GMT+0700 (Western Indonesia Time)',
    };
    console.log(isAbsenMulaiValid(params));
  });
});
