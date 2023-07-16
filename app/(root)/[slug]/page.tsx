import PostThumbnail from '@/components/PostThumbnail/PostThumbnail';
import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import sanitySdk from '@/services';
import { IUser } from '@/types/common';
import { getServerSession } from 'next-auth';
import React from 'react';

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
  const profile: IUser = await sanitySdk.getUserBySlug(slug);
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as IUser;

  return (
    <div className="pb-12">
      <ProfileHeader profile={profile} currentUser={currentUser} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-w-[935px] mx-auto mt-12">
        {profile.posts.map((post) => (
          <PostThumbnail
            key={post._id}
            currentPost={post}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
