'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { EyeOffIcon } from '../icons/eye-off-icon';
import { EyeIcon } from '../icons/eye-icon';
import { twMerge } from 'tailwind-merge';

export function PasswordInput(props: {
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <Input
        id={props.id}
        name={props.name}
        className={twMerge(`w-full ${props.className}`)}
        type={showPassword ? 'text' : 'password'}
        placeholder={props.placeholder || 'Enter your password'}
        autoComplete='off'
        required
      />
      <Button
        variant='ghost'
        size='icon'
        className='absolute top-1/2 transform -translate-y-1/2 right-2'
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <EyeOffIcon className='h-5 w-5' />
        ) : (
          <EyeIcon className='h-5 w-5' />
        )}
        <span className='sr-only'>Toggle password visibility</span>
      </Button>
    </div>
  );
}
