import CardStatistik from "@/components/card-statistik";
import TableMatakuliah from "@/components/table-matakuliah";
const mataKuliah = [
	{
		id: 1,
		kodeMatakuliah: "MK-KWU",
		nama: "Kewirausahaan",
		sks: 2,
		jenis: "Praktikum",
		absen: "Absen",
		jamMulai: new Date("2024-12-01 13:12:00").toLocaleString("id-ID", { hour: "numeric", minute: "numeric", second: "numeric", hour12: false }),
		jamSelesai: new Date("2024-12-01 13:12:00").toLocaleString("id-ID", { hour: "numeric", minute: "numeric", second: "numeric", hour12: false }),
	},
	{
		id: 2,
		kodeMatakuliah: "MK-KWU",
		nama: "Kewirausahaan",
		sks: 2,
		jenis: "Praktikum",
		absen: "Absen",
		jamMulai: new Date("2024-12-01 13:12:00").toLocaleString("id-ID", { hour: "numeric", minute: "numeric", second: "numeric", hour12: false }),
		jamSelesai: new Date("2024-12-01 13:12:00").toLocaleString("id-ID", { hour: "numeric", minute: "numeric", second: "numeric", hour12: false }),

	},
];
export default function Page() {
	return (
		<>
			<section className="max-w-7xl mx-auto mt-5 px-3">
				<h1 className="text-3xl font-bold mb-3">Dashboard</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					<CardStatistik
						title="Total Jadwal Mengajar"
						value={0}
					/>
					<CardStatistik
						title="Jumlah Presensi"
						value={0}
					/>
				</div>
			</section>
			<section className="px-3">
				<div className="max-w-7xl mx-auto mt-5">
					<TableMatakuliah data={mataKuliah} />
				</div>
			</section>
		</>
	);
}
