import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { IUser } from '@/types/common';
import { getServerSession } from 'next-auth';
import React from 'react';

const Inbox = async () => {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as IUser;
  
  return <div className="p-3">Inbox</div>;
};

export default Inbox;
