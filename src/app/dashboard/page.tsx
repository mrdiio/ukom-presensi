'use server';

import { getJadwalCount } from '@/actions/get-jadwal-count';
import { getJadwalMataKuliah } from '@/actions/get-jadwal-mata-kuliah';
import { getPresensiCount } from '@/actions/get-presensi-count';
import CardStatistik from '@/components/card-statistik';
import TableMatakuliah from '@/components/table-matakuliah';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
// const mataKuliah = [
//   {
//     id: 1,
//     kodeMatakuliah: 'MK-KWU',
//     nama: 'Kewirausahaan',
//     sks: 2,
//     jenis: 'Praktikum',
//     absen: 'Absen',
//     jamMulai: new Date('2024-12-01 13:12:00').toLocaleString('id-ID', {
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       hour12: false,
//     }),
//     jamSelesai: new Date('2024-12-01 13:12:00').toLocaleString('id-ID', {
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       hour12: false,
//     }),
//   },
//   {
//     id: 2,
//     kodeMatakuliah: 'MK-KWU',
//     nama: 'Kewirausahaan',
//     sks: 2,
//     jenis: 'Praktikum',
//     absen: 'Absen',
//     jamMulai: new Date('2024-12-01 13:12:00').toLocaleString('id-ID', {
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       hour12: false,
//     }),
//     jamSelesai: new Date('2024-12-01 13:12:00').toLocaleString('id-ID', {
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       hour12: false,
//     }),
//   },
// ];
export default async function Page() {
  const session = await getServerSession(authOptions);

  const jadwalCount = await getJadwalCount({
    email: `${session?.user?.email}`,
  });

  const presensiCount = await getPresensiCount({
    email: `${session?.user?.email}`,
  });

  const jadwalMataKuliah = await getJadwalMataKuliah({
    email: `${session?.user?.email}`,
  });

  return (
    <>
      <section className='max-w-7xl mx-auto mt-5 px-3'>
        <h1 className='text-3xl font-bold mb-3'>Dashboard</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <CardStatistik title='Total Jadwal Mengajar' value={jadwalCount} />
          <CardStatistik title='Jumlah Presensi' value={presensiCount} />
        </div>
      </section>
      <section className='px-3'>
        <div className='max-w-7xl mx-auto mt-5'>
          <TableMatakuliah
            email={`${session?.user?.email}`}
            data={jadwalMataKuliah}
          />
        </div>
      </section>
    </>
  );
}
