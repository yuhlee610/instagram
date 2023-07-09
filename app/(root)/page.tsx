import React from 'react';
import Posts from '@/components/Posts/Posts';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import sanitySdk from '@/services';
import { IUser } from '@/types/common';
import { getServerSession } from 'next-auth';

const Home = async () => {
  const posts = await sanitySdk.getLatestPosts({});
  const session = await getServerSession(authOptions);
  const user = session?.user as IUser;

  return (
    <div className="flex justify-center mb-11">
      <Posts initialPosts={posts} user={user} />
    </div>
  );
};

export default Home;
