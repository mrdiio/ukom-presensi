import { getJadwalCount } from './get-jadwal-count';

describe('getJadwalCount', () => {
  it('should return the count of jadwal for the given email', async () => {
    const payload = { email: 'ahmad.yusran@univ.ac.id' };

    const result = await getJadwalCount(payload);

    console.log(result);

    expect(result).toBeGreaterThanOrEqual(0);
  });
});
