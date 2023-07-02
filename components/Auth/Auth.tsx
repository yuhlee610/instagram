import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const Auth = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default Auth;
