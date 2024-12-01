import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'UKOM Presensi | Login',
  description: 'Login to your account',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const server = await getServerSession(authOptions)

  if (!server) redirect('/')

  return (
    <>
      <Header userName={server?.user?.email || 'unknown'} />
      {children}
    </>
  )
}
