import ProfileHeader from '@/components/ProfileHeader/ProfileHeader';
import sanitySdk from '@/services';
import { IUser } from '@/types/common';
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

  return (
    <div>
      <ProfileHeader profile={profile} />
    </div>
  );
};

export default Profile;
