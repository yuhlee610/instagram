import { authOptions } from '@/pages/api/auth/[...nextauth]';
import sanitySdk from '@/services';
import { IUser } from '@/types/common';
import getQueryClient from '@/utils/getQueryClient';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { getServerSession } from 'next-auth';
import React from 'react';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import ProfilePosts from '@/components/ProfilePosts/ProfilePosts';

interface IProfile {
  params: {
    slug: string;
  };
}

async function staticParams() {
  const slugs = await sanitySdk.getSlugs();
  return slugs.map((slug: { slug: string }) => ({ slug: slug.slug }));
}

// fix "dynamic server usage" errors in dev mode by turning off static generation and forcing dynamic rendering
export const generateStaticParams =
  process.env.NODE_ENV === 'production' ? staticParams : undefined;
export const dynamic =
  process.env.NODE_ENV === 'production' ? 'auto' : 'force-dynamic';

const Profile = async (props: IProfile) => {
  const { slug } = props.params;
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(['currentUser'], async () => {
      const session = await getServerSession(authOptions);
      return session?.user as IUser;
    }),
    queryClient.prefetchQuery(['profile', slug], () =>
      sanitySdk.getUserBySlug(slug)
    ),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className="pb-12">
        <ProfileHeader slug={slug} />
        <ProfilePosts slug={slug} />
      </div>
    </Hydrate>
  );
};

export default Profile;
