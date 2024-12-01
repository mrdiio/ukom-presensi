'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { $Enums, Hari } from '@prisma/client';
import { convertIsoTime } from '@/lib/convert-iso-time';
import { postPresensiMulai } from '@/actions/post-presensi-mulai';
import { postPresensiSelesai } from '@/actions/post-presensi-selesai';
import { Badge } from './ui/badge';
import { useEffect, useState } from 'react';
import { getJadwalMataKuliah } from '@/actions/get-jadwal-mata-kuliah';
import { isAbsenSelesaiValid } from '@/lib/is-absen-selesai-valid';
import { isAbsenMulaiValid } from '@/lib/is-absen-masuk-valid';
import { convertDate } from '@/lib/convert-date';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TableMatakuliah({
  email,
  data,
}: {
  email: string;
  data: {
    id: string;
    kodeMatakuliah: string;
    nama: string;
    sks: number;
    jenis: $Enums.Jenis;
    jamMulai: Date;
    jamSelesai: Date;
    hari: $Enums.Hari;
    tanggal: Date;
    absenMulai: Date | null;
    absenSelesai: Date | null;
  }[];
}) {
  const [dataJadwalMataKuliah, setDataJadwalMataKuliah] = useState(data);
  const [triggerRefetch, setTriggerRefetch] = useState(false);
  const { toast } = useToast();

  async function handleAbsenDatang(jadwalId: string) {
    try {
      const absenMulai = await postPresensiMulai({
        email: `${email}`,
        jadwalId: jadwalId,
        jamMulai: new Date().toISOString(),
      });

      if (absenMulai.id) {
        toast({
          title: 'Berhasil absen datang',
          description: `${convertIsoTime(`${absenMulai.waktuMulai}`, 0)}`,
        });

        setTriggerRefetch(true);
        return false;
      }

      throw new Error('Gagal absen datang');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Gagal absen datang',
        description: error.message,
      });
    }
  }

  async function handleAbsenPulang(jadwalId: string) {
    try {
      const absenSelesai = await postPresensiSelesai({
        email: `${email}`,
        jadwalId: jadwalId,
        jamSelesai: new Date().toISOString(),
      });

      if (absenSelesai.id) {
        toast({
          title: 'Berhasil absen selesai',
          description: `${convertIsoTime(`${absenSelesai.waktuSelesai}`, 0)}`,
        });

        setTriggerRefetch(true);
        return false;
      }

      throw new Error('Gagal absen selesai');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Gagal absen selesai',
        description: error.message,
      });
    }
  }

  useEffect(() => {
    (async () => {
      if (triggerRefetch) {
        const newData = await getJadwalMataKuliah({
          email: `${email}`,
        });
        setDataJadwalMataKuliah(newData);
        setTriggerRefetch(false);
      }
    })();
  }, [email, triggerRefetch]);

  return (
    <div>
      <Table>
        <TableCaption>List matakuliah yang diampu</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>No</TableHead>
            <TableHead className='w-[150px]'>Kode Matakuliah</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead className='text-center'>SKS</TableHead>
            <TableHead className='text-center'>Jenis</TableHead>
            <TableHead className='text-center'>Tanggal</TableHead>
            <TableHead className='text-center'>Hari</TableHead>
            <TableHead className='text-center'>Jam Mulai</TableHead>
            <TableHead className='text-center'>Jam Selesai</TableHead>
            <TableHead className='text-center'>Absen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataJadwalMataKuliah.map((item, index) => (
            <TableRow key={index}>
              <TableCell className='font-medium'>{index + 1}</TableCell>
              <TableCell>{item.kodeMatakuliah}</TableCell>
              <TableCell>{item.nama}</TableCell>
              <TableCell className='text-center'>{item.sks}</TableCell>
              <TableCell className='text-right'>{item.jenis}</TableCell>
              <TableCell className='text-right'>
                {convertDate(`${item.tanggal}`, 0)}
              </TableCell>
              <TableCell className='text-right'>{item.hari}</TableCell>
              <TableCell className='text-right'>
                {convertIsoTime(`${item.jamMulai}`, 0)}
              </TableCell>
              <TableCell className='text-right'>
                {convertIsoTime(`${item.jamSelesai}`, 0)}
              </TableCell>
              <TableCell className='text-right flex flex-wrap gap-2 justify-center items-center'>
                {item.absenMulai ? (
                  <Badge>{convertIsoTime(`${item.absenMulai}`, 0)}</Badge>
                ) : (
                  <Button
                    onClick={() => handleAbsenDatang(item.id)}
                    disabled={
                      !isAbsenMulaiValid({
                        hari: item.hari as Hari,
                        jamMulai: item.jamMulai,
                        jamSelesai: item.jamSelesai,
                      })
                    }
                  >
                    Absen Datang
                  </Button>
                )}
                {item.absenSelesai ? (
                  <Badge variant={'destructive'}>
                    {convertIsoTime(`${item.absenSelesai}`, 0)}
                  </Badge>
                ) : (
                  <Button
                    variant={'destructive'}
                    onClick={() => handleAbsenPulang(item.id)}
                    disabled={
                      !isAbsenSelesaiValid({
                        jamSelesai: item.jamSelesai,
                        jamMulai: item.jamMulai,
                        hari: item.hari as Hari,
                      })
                    }
                  >
                    Absen Pulang
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
