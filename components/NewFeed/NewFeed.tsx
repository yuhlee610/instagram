'use client';

import { IClassName, IPost, IUser } from '@/types/common';
import React, { useEffect, useRef } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { PiSpinnerGap } from 'react-icons/pi';
import NewFeedPost from '../NewFeedPost/NewFeedPost';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import useCurrentUser from '@/hooks/useCurrentUser';

interface INewFeed extends IClassName {}

interface INextPageParam {
  lastId: string;
  lastCreatedAt: string;
  hasNextPage: boolean;
}

const PER_PAGE = 3;

const NewFeed = (props: INewFeed) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const isOnView = useInfiniteScroll(observerTarget);
  const nextPageParamRef = useRef<INextPageParam>({
    lastId: '',
    lastCreatedAt: '',
    hasNextPage: true,
  });
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['newFeedPosts'],
    queryFn: async () => {
      const { lastId, lastCreatedAt, hasNextPage } = nextPageParamRef.current;

      if (!hasNextPage) {
        return Promise.resolve([]);
      }

      const response = await fetch(
        `/api/post?lastId=${lastId}&lastCreatedAt=${lastCreatedAt}&perPage=${PER_PAGE}`
      );

      const data = await response.json();
      const posts = data.data as IPost[];
      const lastPost = posts.findLast((post: IPost) => post);

      nextPageParamRef.current = {
        lastId: lastPost?._id || '',
        lastCreatedAt: lastPost?.createdAt || '',
        hasNextPage: !!lastPost,
      };

      return posts;
    },
    getNextPageParam: (_, allPages) => {
      return nextPageParamRef.current.hasNextPage
        ? allPages.length + 1
        : undefined;
    },
  });
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (isOnView && !!nextPageParamRef.current.lastId) {
      fetchNextPage();
    }
  }, [isOnView]);

  return (
    <div
      className={`flex flex-col space-y-4 mb-4 mt-6 w-full justify-center items-center ${props.className}`}
    >
      {data?.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.map((post: IPost) => {
            const isPostLiked = !!currentUser?.liked.find(
              (likedPost) => likedPost.post._ref === post._id
            );
            return (
              <NewFeedPost
                key={post._id}
                currentUser={currentUser!}
                isPostLiked={isPostLiked}
                post={post}
              />
            );
          })}
        </React.Fragment>
      ))}
      <div ref={observerTarget} />
      {isFetchingNextPage && (
        <PiSpinnerGap className="animate-spin w-6 h-6 mx-auto mt-4" />
      )}
    </div>
  );
};

export default NewFeed;
