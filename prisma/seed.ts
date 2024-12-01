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

  const days = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT']

  const generateJadwal = async () => {
    const jadwals: {
      dosenId: string
      mataKuliahId: string
      hari: string
      jamMulai: string
      jamSelesai: string
    }[] = []

    const dosens = await db.dosen.findMany()
    const makul = await db.mataKuliah.findMany()

    makul.forEach(async (mk, i) => {
      const dosenId = dosens[i % dosens.length].id

      const hari = days[i % days.length]
      const jamMulai = new Date()
      jamMulai.setHours(8 + (i % days.length), 0, 0)

      console.log()

      const jamSelesai = new Date(jamMulai)
      const menitPerSks = mk.jenis === 'TEORI' ? 55 : 120

      jamSelesai.setMinutes(jamMulai.getMinutes() + mk.sks * menitPerSks)

      jadwals.push({
        dosenId,
        mataKuliahId: mk.id,
        hari,
        jamMulai: jamMulai.toISOString(),
        jamSelesai: jamSelesai.toISOString(),
      })
    })

    return jadwals
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
