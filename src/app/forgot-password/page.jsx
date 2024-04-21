"use client"
import React, { useState, useEffect } from 'react';
import { useAuth, useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  async function create(e) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then(_ => {
        setSuccessfulCreation(true);
        setError('');
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  async function reset(e) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then(result => {
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
          setError('');
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId });
          setError('');
        } else {
          console.log(result);
        }
      })
      .catch(err => {
        console.error('error', err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
<section class="bg-gray-50 dark:bg-gray-900 pt-[4rem]">
    <div class="flex flex-col items-center justify-start px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
      <h1 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Forgot Password?</h1>
      <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={!successfulCreation ? create : reset}>
        {!successfulCreation && (
          <>
            <label htmlFor='email' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please provide your email address</label>
            <input type='email' placeholder='e.g john@doe.com' value={email} onChange={e => setEmail(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <button class="w-full text-white bg-blue-500 hover:bg-blue-600  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 ">Send password reset code</button>
            {error && <p>{error}</p>}
          </>
        )}

        {successfulCreation && (
          <>
            <label htmlFor='password' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your new password</label>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <label htmlFor='password' class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter the password reset code that was sent to your email</label>
            <input type='text' value={code} onChange={e => setCode(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <button class="w-full text-white  bg-blue-500 hover:bg-blue-600  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:bg-blue-500 dark:hover:bg-blue-600 ">Reset</button>
            {error && <p>{error}</p>}
          </>
        )}
</form>
    </div>
    </div>
</section>
  );
};

export default ForgotPasswordPage;
