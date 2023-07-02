'use client';

import React from 'react';
import GoogleIcon from '../GoogleIcon/GoogleIcon';
import { signIn } from 'next-auth/react';

const GoogleLoginButton = () => {
  return (
    <button
      className="py-2 px-3 bg-white text-sm font-semibold rounded-md shadow-md focus:outline-none w-52 text-left"
      onClick={() => signIn('google')}
    >
      <GoogleIcon />
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
