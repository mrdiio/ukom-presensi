import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function DialogDetail() {
  return (
    <Dialog>
      <DialogTrigger>Detail</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Presensi</DialogTitle>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Kode Matakuliah</TableHead>
                <TableHead>Nama Matakuliah</TableHead>
                <TableHead>Waktu Presensi Mulai</TableHead>
                <TableHead className='text-right'>
                  Waktu Presensi Akhir
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='font-medium'>INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className='text-right'>$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
