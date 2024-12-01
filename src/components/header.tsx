'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, UserCircle } from 'lucide-react'
import { useClock } from '@/hooks/useClock'
import { signOut } from 'next-auth/react'

export const Header = ({ userName }: { userName: string }) => {
  const currentTime = useClock()

  return (
    <nav className="border-b h-20 bg-primary text-primary-foreground px-3">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">Presensi Dosen</h1>
        <div className="flex gap-3">
          <p>{currentTime}</p>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <UserCircle className="w-6 h-6" /> {userName || 'Unknown'}{' '}
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
