import React from 'react';
import FacebookLoginButton from '@/components/FacebookLoginButton/FacebookLoginButton';
import GoogleLoginButton from '@/components/GoogleLoginButton/GoogleLoginButton';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Login = () => {
  const session = getServerSession(authOptions);

  if (!!session) {
    redirect('/');
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-10">
      <GoogleLoginButton />
      <FacebookLoginButton />
    </div>
  );
};

export default Login;
