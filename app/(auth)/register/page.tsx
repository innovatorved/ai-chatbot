'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';

import { AuthForm } from '@/components/auth-form';
import { SubmitButton } from '@/components/submit-button';

import { register, type RegisterActionState } from '../actions';

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [turnstileStatus, setTurnstileStatus] = useState<
    'success' | 'error' | 'expired' | 'required'
  >('required');
  const turnstileRef = useRef<string>();

  const handleTurnstileStatus = useCallback(
    (status: 'success' | 'error' | 'expired' | 'required') => {
      setTurnstileStatus(status);
    },
    [],
  );

  const [state, formAction] = useActionState<RegisterActionState, FormData>(
    register,
    {
      status: 'idle',
    },
  );

  useEffect(() => {
    if (state.status === 'user_exists') {
      toast.error('Account already exists');
    } else if (state.status === 'failed') {
      toast.error('Failed to create account');
    } else if (state.status === 'invalid_data') {
      toast.error('Failed validating your submission!');
    } else if (state.status === 'success') {
      toast.success('Account created successfully');
      setIsSuccessful(true);
      router.refresh();
    }
  }, [state, router]);

  const handleSubmit = (formData: FormData) => {
    setEmail(formData.get('email') as string);
    switch (turnstileStatus) {
      case 'required':
        turnstileRef.current = 'required';
        toast.error('Please complete the reCAPTCHA challenge');
        break;
      case 'expired':
        turnstileRef.current = 'expired';
        toast.error('reCAPTCHA challenge expired');
        break;
      case 'error':
        turnstileRef.current = 'error';
        toast.error('Failed to complete the reCAPTCHA challenge');
        break;
      case 'success':
        turnstileRef.current = 'success';
        formAction(formData);
        break;
    }
  };

  return (
    <div className="flex h-dvh w-screen items-start pt-12 md:pt-0 md:items-center justify-center bg-background">
      <div className="w-full max-w-md overflow-hidden rounded-2xl gap-12 flex flex-col">
        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center sm:px-16">
          <h3 className="text-xl font-semibold dark:text-zinc-50">Sign Up</h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400">
            Create an account with your email and password
          </p>
        </div>
        <AuthForm
          action={handleSubmit}
          defaultEmail={email}
          handleTurnstileStatus={handleTurnstileStatus}
          turnstileRef={turnstileRef}
        >
          <SubmitButton isSuccessful={isSuccessful}>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600 mt-4 dark:text-zinc-400">
            {'Already have an account? '}
            <Link
              href="/login"
              className="font-semibold text-gray-800 hover:underline dark:text-zinc-200"
            >
              Sign in
            </Link>
            {' instead.'}
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
