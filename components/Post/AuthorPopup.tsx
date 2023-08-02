'use client';

import React from 'react';
import Link from 'next/link';
import { IntermediateAvatar } from '../Avatar/Avatar';
import { IUser } from '@/types/common';
import { formatTotalNumber } from '@/lib/posts';
import Image from 'next/image';
import sanitySdk from '@/services';
import Button from '../Button/Button';
import { isCreatedChatWith } from '@/lib/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

type AuthorPopupType = {
  slug: string;
  author: IUser;
  currentUser: IUser;
  className?: string;
};

const BIO_LIMIT = 120;

const AuthorPopup = (props: AuthorPopupType) => {
  const {
    slug,
    author: {
      _id: authorId,
      avatar,
      name,
      bio,
      postsTotal,
      followers,
      following,
      threeLatestPosts,
    },
    currentUser,
    className,
  } = props;

  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: inboxMutate } = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ partnerId: authorId }),
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
    const inboxPromise = isCreatedChatWith(currentUser, props.author)
      ? Promise.resolve({})
      : inboxMutate();
    inboxPromise.then(() => {
      router.push('/inbox');
    });
  };

  const formattedThreeLatestPosts = threeLatestPosts
    ?.map((post) => post.images)
    .flatMap((image) => image);

  return (
    <div className={`py-3 ${className}`}>
      <div className="flex items-center px-2 gap-2 pb-3">
        <Link href={`/${slug}`} className="font-semibold text-sm">
          <IntermediateAvatar image={avatar} />
        </Link>
        <div>
          <Link href={`/${slug}`} className="font-semibold text-sm">
            {name}
          </Link>
          <div className="text-sm">
            {(bio?.length ?? 0) <= BIO_LIMIT
              ? bio
              : `${bio?.substring(0, BIO_LIMIT)}...`}
          </div>
        </div>
      </div>
      <div className="py-3 px-2 flex justify-between">
        <div className="text-sm text-center">
          <strong>{formatTotalNumber(postsTotal)}</strong> bài viết
        </div>
        <div className="text-sm text-center">
          <strong>{formatTotalNumber(followers.length)}</strong> người theo dõi
        </div>
        <div className="text-sm text-center">
          <strong>{formatTotalNumber(following.length)}</strong> đang theo dõi
        </div>
      </div>
      <div className="flex gap-1">
        {formattedThreeLatestPosts?.map((image) => (
          <div
            className="relative flex-1 after:content-[''] after:block after:pb-[100%]"
            key={image._key as string}
          >
            <Image
              className="object-cover"
              src={sanitySdk.urlFor(image).toString()}
              fill
              alt=""
            />
          </div>
        ))}
      </div>
      <Button onClick={onInbox} className="ml-auto mt-3 mr-3 block">
        Nhắn tin
      </Button>
    </div>
  );
};

export default AuthorPopup;
