import { PrismaClient, Jenis, Hari } from '@prisma/client'
import { Dosens } from './data/dosen'
import * as bcrypt from 'bcrypt'
import { MataKuliahs } from './data/matakuliah'

const db = new PrismaClient()

async function main() {
  try {
    await db.$executeRawUnsafe(
      `TRUNCATE TABLE dosen, matakuliah, jadwal, presensi RESTART IDENTITY CASCADE;`
    )
  } catch (error) {
    console.log({ error })
  }

  await db.dosen.createMany({
    data: Dosens.map((dosen) => ({
      ...dosen,
      password: bcrypt.hashSync('123123', 10),
    })),
  })

  await db.mataKuliah.createMany({
    data: MataKuliahs.map((mk) => ({
      ...mk,
      jenis: mk.jenis as Jenis,
    })),
  })

  const generateJadwal = async () => {
    const dosens = await db.dosen.findMany()
    const makul = await db.mataKuliah.findMany()

    const startDate = new Date('2024-12-03')

    const days = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT']

    const jadwalData: {
      dosenId: string
      mataKuliahId: string
      hari: string
      tanggal: string
      jamMulai: string
      jamSelesai: string
    }[] = []

    makul.forEach(async (mk, i) => {
      const dosenId = dosens[i % dosens.length]

      let durasi

      // tentukan durasi berdasarkan jenis mata kuliah
      if (mk.jenis === 'TEORI') {
        durasi = mk.sks * 55
      } else {
        durasi = mk.sks * 120
      }

      // tentukan hari dan jam mulai
      const hariIndex = i % days.length
      const hari = days[hariIndex]

      // Tentukan tanggal berdasarkan hariIndex
      const jamMulai = new Date(startDate)
      jamMulai.setHours(8 + (hariIndex % 5)) // Jam mulai bervariasi setiap hari
      jamMulai.setMinutes(0)

      // hitung jam selesai
      const jamSelesai = new Date(jamMulai)
      jamSelesai.setMinutes(jamMulai.getMinutes() + durasi)

      jadwalData.push({
        dosenId: dosenId.id,
        mataKuliahId: mk.id,
        hari: hari,
        tanggal: new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + hariIndex
        ).toISOString(),
        jamMulai: jamMulai.toISOString(),
        jamSelesai: jamSelesai.toISOString(),
      })
    })

    return jadwalData
  }

  const jadwals = await generateJadwal()

  for (const jadwal of jadwals) {
    await db.jadwal.create({
      data: {
        ...jadwal,
        hari: jadwal.hari as Hari,
      },
    })
  }
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
