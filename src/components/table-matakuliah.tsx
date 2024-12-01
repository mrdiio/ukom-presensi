"use client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";
import DialogDetail from "./dialog-detail";
import { useToast } from "@/hooks/use-toast";

export default function TableMatakuliah({ data }: { data: any[] }) {
	const { toast } = useToast();

	function handleAbsenDatang() {
		try {
			toast({
				title: "Success : Sudah absen datang",
				description: "Friday, February 10, 2023 at 5:57 PM",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Gagal : Waktu tidak sesuai",
				description: "Friday, February 10, 2023 at 5:57 PM",
			});
		}
	}
	function handleAbsenPulang() {
		try {
			toast({
				title: "Success : Sudah absen pulang",
				description: "Friday, February 10, 2023 at 5:57 PM",
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Gagal : Waktu tidak sesuai",
				description: "Friday, February 10, 2023 at 5:57 PM",
			});
		}
	}

	return (
		<div>
			<Table>
				<TableCaption>List matakuliah yang diampu</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">No</TableHead>
						<TableHead className="w-[150px]">Kode Matakuliah</TableHead>
						<TableHead>Nama</TableHead>
						<TableHead className="text-center">SKS</TableHead>
						<TableHead className="text-center">Jenis</TableHead>
						<TableHead className="text-center">Jam Mulai</TableHead>
						<TableHead className="text-center">Jam Selesai</TableHead>
						<TableHead className="text-center">Absen</TableHead>
						<TableHead className="text-right">Detail</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium">{item.id}</TableCell>
							<TableCell>{item.kodeMatakuliah}</TableCell>
							<TableCell>{item.nama}</TableCell>
							<TableCell className="text-center">{item.sks}</TableCell>
							<TableCell className="text-right">{item.jenis}</TableCell>
							<TableCell className="text-right">{item.jamMulai}</TableCell>
							<TableCell className="text-right">{item.jamSelesai}</TableCell>
							<TableCell className="text-right flex flex-wrap gap-2 justify-center">
								<Button onClick={() => handleAbsenDatang()}>Absen Datang</Button>
								<Button
									variant="destructive"
									onClick={() => handleAbsenPulang()}>
									Absen Pulang
								</Button>
							</TableCell>
							<TableCell className="text-right">
								<DialogDetail />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
