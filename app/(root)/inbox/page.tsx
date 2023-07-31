import Messenger from '@/components/Messenger/Messenger';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { IUser } from '@/types/common';
import getQueryClient from '@/utils/getQueryClient';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import React from 'react';

const Inbox = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['currentUser'], async () => {
    const session = await getServerSession(authOptions);
    return session?.user as IUser;
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="mb-11 h-full">
      <Hydrate state={dehydratedState}>
        <Messenger />
      </Hydrate>
    </div>
  );
};

export default Inbox;
