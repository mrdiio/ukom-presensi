import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TableMatakuliah from './table-matakuliah';
import { getJadwalMataKuliah } from '@/actions/get-jadwal-mata-kuliah';
import { Hari, Jenis } from '@prisma/client';

jest.mock('@/hooks/use-toast');
jest.mock('@/actions/post-presensi-mulai');
jest.mock('@/actions/post-presensi-selesai');
jest.mock('@/actions/get-jadwal-mata-kuliah');

const mockGetJadwalMataKuliah = getJadwalMataKuliah as jest.Mock;

describe('TableMatakuliah', () => {
  const email = 'test@example.com';
  const data = [
    {
      id: '1',
      kodeMatakuliah: 'MK001',
      nama: 'Matematika',
      sks: 3,
      jenis: 'TEORI' as Jenis,
      jamMulai: `${new Date().toISOString()}` as unknown as Date,
      jamSelesai: `${new Date().toISOString()}` as unknown as Date,
      hari: 'SENIN' as Hari,
      tanggal: `${new Date().toISOString()}` as unknown as Date,
      absenMulai: null,
      absenSelesai: null,
    },
  ];

  beforeEach(() => {
    mockGetJadwalMataKuliah.mockResolvedValue(data);
  });

  it('renders table with data', () => {
    render(<TableMatakuliah email={email} data={data} />);

    console.log("screen.getByText('MK001')", screen.getByText('MK001'));
  });
});
