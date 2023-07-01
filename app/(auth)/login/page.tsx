'use client';

import FacebookIcon from '@/components/FacebookIcon/FacebookIcon';
import GoogleIcon from '@/components/GoogleIcon/GoogleIcon';
import React from 'react'

const Login = () => {
  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <button className="py-2 px-3 bg-white text-sm font-semibold rounded-md shadow-md focus:outline-none w-52 text-left">
        <GoogleIcon />
        Sign in with Google
      </button>
      <button className="py-2 px-3 bg-white text-sm font-semibold rounded-md shadow-md focus:outline-none w-52 text-left">
        <FacebookIcon />
        Sign in with Facebook
      </button>
    </div>
  );
}

export default Login