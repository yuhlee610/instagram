'use client';

import React, { useState } from 'react';
import { LargeAvatar, XLargeAvatar } from '../Avatar/Avatar';
import { IUser } from '@/types/common';
import Button from '../Button/Button';
import { formatTotalNumber } from '@/lib/posts';

interface IProfileHeader {
  profile: IUser;
  currentUser: IUser;
}

const MOBILE_BREAKPOINT = 768;

const ProfileHeader = (props: IProfileHeader) => {
  const {
    profile: { avatar, name, bio, posts, followers, following, _id },
    currentUser,
  } = props;
  const [currentUserIsFollower, setCurrentUserIsFollower] = useState<boolean>(
    !!followers.find((follower) => follower.user._ref === currentUser._id)
  );
  const [followersTotal, setFollowersTotal] = useState<number>(
    followers.length
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isMobileLayout =
    typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT;

  const onFollow = () => {
    setIsLoading(true);
    fetch('/api/user/follow', {
      method: 'POST',
      body: JSON.stringify({ followingId: _id }),
    })
      .then(() => {
        setCurrentUserIsFollower(true);
        setFollowersTotal((totalFollow) => totalFollow + 1);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const onUnFollow = () => {
    setIsLoading(true);
    fetch(`/api/user/unFollow?followingId=${_id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCurrentUserIsFollower(false);
        setFollowersTotal((totalFollow) => totalFollow - 1);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

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
          onClick={currentUserIsFollower ? onUnFollow : onFollow}
          disabled={isLoading}
        >
          {currentUserIsFollower ? 'Đang theo dõi' : 'Theo dõi'}
        </Button>
        <Button onClick={() => {}}>Nhắn tin</Button>
      </div>
      <div className="hidden md:block md:col-start-2 md:row-start-2">
        <strong>{posts.length}</strong> bài viết
      </div>
      <div className="hidden md:block md:col-start-3 md:row-start-2">
        <strong>{formatTotalNumber(followersTotal)}</strong> người theo dõi
      </div>
      <div className="hidden md:block md:col-start-4 md:row-start-2">
        Đang theo dõi <strong>{formatTotalNumber(following.length)}</strong>{' '}
        người dùng
      </div>
      <div className="text-sm mt-6 col-start-1 col-end-3 md:col-start-2 md:col-end-5">
        {bio}
      </div>
    </div>
  );
};

export default ProfileHeader;
