'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PasswordInput } from './components/password-input';
import { useEffect, useReducer } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FormLoginState {
  email: string;
  password: string;
}

export default function Page() {
  const { toast } = useToast();
  const [formLogin, setFormLogin] = useReducer(
    (state: FormLoginState, newState: Partial<FormLoginState>) => ({
      ...state,
      ...newState,
    }),
    {
      email: '',
      password: '',
    }
  );

  const handleLogin = async () => {
    try {
      console.log(formLogin);
      throw new Error('An error occurred while logging in');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error.message || 'An error occurred while logging in',
        duration: 3000,
      });
    }
    return null;
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        console.log('Enter key was pressed. Run your function.');
        event.preventDefault();
        handleLogin();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-white'>
      <Card className='mx-auto max-w-sm'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                name='email'
                onChange={(e) => setFormLogin({ email: e.target.value })}
                autoComplete='email'
                placeholder='your@main.example'
                required
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <PasswordInput
                id='password'
                onChange={(value) => setFormLogin({ password: value })}
              />
            </div>
            <Button type='button' className='w-full' onClick={handleLogin}>
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
