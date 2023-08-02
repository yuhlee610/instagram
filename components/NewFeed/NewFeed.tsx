'use client';

import { IClassName, IPost } from '@/types/common';
import React, { useEffect, useRef } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { PiSpinnerGap } from 'react-icons/pi';
import NewFeedPost from '../NewFeedPost/NewFeedPost';
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import useCurrentUser from '@/hooks/useCurrentUser';

interface INewFeed extends IClassName {}

const PER_PAGE = 3;

const NewFeed = (props: INewFeed) => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const isOnView = useInfiniteScroll(observerTarget);
  const queryClient = useQueryClient();
  const usePrefetchDataRef = useRef<boolean>(true);
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['newFeedPosts'],
    queryFn: async () => {
      const prevPosts = queryClient.getQueryData([
        'newFeedPosts',
      ]) as InfiniteData<IPost[]>;

      const prevLastChunkIndex = prevPosts.pages.findLastIndex((c) => c);
      const prevLastChunk = prevPosts.pages[prevLastChunkIndex];

      if (usePrefetchDataRef.current || prevLastChunk.length === 0) {
        usePrefetchDataRef.current = false;
        return prevLastChunk;
      }

      const prevLastPost = prevLastChunk?.findLast((p) => p);
      const { _id: lastId = '', createdAt: lastCreatedAt = '' } =
        prevLastPost ?? {};

      const response = await fetch(
        `/api/post?lastId=${lastId}&lastCreatedAt=${lastCreatedAt}&perPage=${PER_PAGE}`
      );

      const data = await response.json();
      return data.data;
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : undefined,
    refetchOnWindowFocus: false,
  });
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (isOnView) {
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
