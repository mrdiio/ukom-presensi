'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().min(3).email(),
  password: z.string().min(6),
})

export default function FormSignIn() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  interface FormValues {
    email: string
    password: string
  }

  interface LoginResponse {
    error?: string
  }

  const formSubmit = async (values: FormValues) => {
    setLoading(true)
    const login = (await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
    })) as LoginResponse | undefined

    if (login?.error) {
      form.setError('email', {
        type: 'manual',
        message: login.error,
      })
      setLoading(false)
    } else {
      router.refresh()
    }
  }
  return (
    <Form {...form}>
      <form
        className="sm:space-y-6 space-y-4"
        onSubmit={form.handleSubmit(formSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoFocus={true}
                  autoComplete="email"
                  placeholder="Input email anda disini"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Input password anda disini"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end items-center pt-4 gap-2">
          {loading && <Loader2 className="animate-spin" size={26} />}
          <Button type="submit" className="sm:w-48 w-full" disabled={loading}>
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  )
}
