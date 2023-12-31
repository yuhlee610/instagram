'use client';

import React from 'react';
import { LargeAvatar, XLargeAvatar } from '../Avatar/Avatar';
import { IClassName, IUser } from '@/types/common';
import Button from '../Button/Button';
import { formatTotalNumber } from '@/lib/posts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useCurrentUser from '@/hooks/useCurrentUser';
import { isCreatedChatWith } from '@/lib/user';
import { useRouter } from 'next/navigation';

interface IProfileHeader extends IClassName {
  slug: string;
}

const MOBILE_BREAKPOINT = 768;

const ProfileHeader = (props: IProfileHeader) => {
  const { slug } = props;
  const queryClient = useQueryClient();
  const router = useRouter();
  const currentUser = useCurrentUser();

  const { data: profile } = useQuery({
    queryKey: ['profile', slug],
    queryFn: async () => {
      const response = await fetch(`/api/user/getBySlug?slug=${slug}`);
      const data = await response.json();
      return data.data as IUser;
    },
  });

  const { avatar, name, bio, posts, followers, following, _id } = profile || {};

  const { mutate: followMutate, isLoading: followLoading } = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/user/follow', {
        method: 'POST',
        body: JSON.stringify({ followingId: _id }),
      });
      return await response.json();
    },
    onSuccess: (newFollow) =>
      queryClient.setQueryData<IUser>(['profile', slug], (oldProfile) => {
        return {
          ...oldProfile,
          followers: [...(followers ?? []), newFollow.data],
        } as IUser;
      }),
  });

  const { mutate: unFollowMutate, isLoading: unFollowLoading } = useMutation({
    mutationFn: () =>
      fetch(`/api/user/unFollow?followingId=${_id}`, {
        method: 'DELETE',
      }),
    onSuccess: () =>
      queryClient.setQueryData<IUser>(['profile', slug], (oldProfile) => {
        return {
          ...oldProfile,
          followers: (followers ?? []).filter(
            (follow) => follow.user._ref !== currentUser?._id
          ),
        } as IUser;
      }),
  });

  const { mutateAsync: inboxMutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ partnerId: profile?._id }),
      });
      return await response.json();
    },
    onSuccess: (newChat) =>
      queryClient.setQueryData<IUser>(['currentUser'], (oldCurrentUser) => {
        return {
          ...oldCurrentUser,
          chats: [...(oldCurrentUser?.chats ?? []), newChat.data],
        } as IUser;
      }),
  });

  const onInbox = () => {
    const inboxPromise = isCreatedChatWith(currentUser, profile)
      ? Promise.resolve({})
      : inboxMutate();
    inboxPromise.then(() => {
      router.push('/inbox');
    });
  };

  const currentUserIsFollower = !!followers?.find(
    (follower) => follower.user._ref === currentUser?._id
  );

  const loading = followLoading || unFollowLoading;

  const isMobileLayout =
    typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT;

  return (
    <div className="max-w-[935px] mx-auto p-4 md:py-7 md:px-10 grid grid-cols-[min-content_1fr] md:grid-cols-[min-content_1fr_1fr_1fr] gap-x-[28px] border-b border-b-slate-300">
      {isMobileLayout ? (
        <LargeAvatar
          image={avatar}
          className="col-span-1 row-span-2 md:row-span-3 md:mr-8"
        />
      ) : (
        <XLargeAvatar
          image={avatar}
          className="col-span-1 row-span-2 md:row-span-3 md:mr-8"
        />
      )}
      <div className="text-xl col-start-2">{name}</div>
      <div className="flex gap-3 row-start-2 col-start-2 md:col-start-3 md:col-end-5 md:row-start-1">
        <Button
          onClick={() =>
            currentUserIsFollower ? unFollowMutate() : followMutate()
          }
          disabled={loading}
        >
          {currentUserIsFollower ? 'Đang theo dõi' : 'Theo dõi'}
        </Button>
        <Button onClick={onInbox}>Nhắn tin</Button>
      </div>
      <div className="hidden md:block md:col-start-2 md:row-start-2">
        <strong>{posts?.length}</strong> bài viết
      </div>
      <div className="hidden md:block md:col-start-3 md:row-start-2">
        <strong>{formatTotalNumber(followers?.length)}</strong> người theo dõi
      </div>
      <div className="hidden md:block md:col-start-4 md:row-start-2">
        Đang theo dõi <strong>{formatTotalNumber(following?.length)}</strong>{' '}
        người dùng
      </div>
      <div className="text-sm mt-6 col-start-1 col-end-3 md:col-start-2 md:col-end-5">
        {bio}
      </div>
    </div>
  );
};

export default ProfileHeader;
