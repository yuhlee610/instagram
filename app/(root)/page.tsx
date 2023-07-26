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
  await queryClient.prefetchInfiniteQuery(
    ['new-feed-posts'],
    () => sanitySdk.getLatestPosts({}),
  );
  const dehydratedState = dehydrate(queryClient);
  const session = await getServerSession(authOptions);
  const user = session?.user as IUser;

  return (
    <div className="flex justify-center mb-11">
      <Hydrate state={dehydratedState}>
        <NewFeed user={user} />
      </Hydrate>
    </div>
  );
};

export default Home;
