import React from 'react';
import NewFeed from '@/components/NewFeed/NewFeed';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import sanitySdk from '@/services';
import { IUser } from '@/types/common';
import { getServerSession } from 'next-auth';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, Hydrate } from '@tanstack/react-query';

const Home = async () => {
  const queryClient = getQueryClient();
  await Promise.all([
    queryClient.prefetchInfiniteQuery(['newFeedPosts'], () =>
      sanitySdk.getLatestPosts({})
    ),
    queryClient.prefetchQuery(['currentUser'], async () => {
      const session = await getServerSession(authOptions);
      return session?.user as IUser;
    }),
  ]);
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex justify-center mb-11">
      <Hydrate state={dehydratedState}>
        <NewFeed />
      </Hydrate>
    </div>
  );
};

export default Home;
