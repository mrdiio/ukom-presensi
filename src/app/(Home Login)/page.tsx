import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import FormSignIn from './components/formSignIn'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <main className="flex-grow flex flex-col items-center justify-center px-5">
          <div className="container max-w-lg sm:py-10 p-6 border-none rounded-md bg-white shadow-md">
            <FormSignIn />
          </div>
        </main>
      </div>
    </div>
  )
}
