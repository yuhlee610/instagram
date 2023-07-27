'use client';

import { IUser } from '@/types/common';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import PostThumbnail from '../PostThumbnail/PostThumbnail';

interface IProfilePosts {
  slug: string;
}

const ProfilePosts = (props: IProfilePosts) => {
  const { slug } = props;
  const { data: profile } = useQuery({
    queryKey: ['profile', slug],
    queryFn: async () => {
      const response = await fetch(`/api/user/getBySlug?slug=${slug}`);
      const data = await response.json();
      return data.data as IUser;
    },
  });

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const response = await fetch('/api/currentUser');
      const data = await response.json();
      return data.data as IUser;
    },
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 max-w-[935px] mx-auto mt-12">
      {profile?.posts.map((post) => (
        <PostThumbnail
          key={post?._id}
          currentPost={post}
          currentUser={currentUser!}
        />
      ))}
    </div>
  );
};

export default ProfilePosts;
