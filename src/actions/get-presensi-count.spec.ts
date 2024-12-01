import { getPresensiCount } from './get-presensi-count';

describe('getPresensiCount', () => {
  it('should return the count of presensi for the given email', async () => {
    const payload = { email: 'ahmad.yusran@univ.ac.id' };

    const result = await getPresensiCount(payload);

    console.log(result);

    expect(result).toBeGreaterThanOrEqual(0);
  });
});
