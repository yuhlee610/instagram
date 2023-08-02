'use client';

import React, { MouseEventHandler } from 'react';
import { IPost, IUser } from '@/types/common';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { TbMessageCircle2 } from 'react-icons/tb';
import Link from 'next/link';
import CommentForm from './CommentForm';

type ActionBarType = {
  className?: string;
  isPostLiked: boolean;
  post: IPost;
  onOpenModal: MouseEventHandler<SVGElement>;
  slug: string;
  showCommentInput: boolean;
  currentUser: IUser;
};

const ActionBar = (props: ActionBarType) => {
  const {
    post: {
      _id: postId,
      likes,
      caption,
      author: { name },
    },
    className,
    isPostLiked,
    onOpenModal,
    slug,
    showCommentInput,
    currentUser,
  } = props;

  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/post/like', {
        method: 'POST',
        body: JSON.stringify({ postId }),
      });
      return await response.json();
    },
    onSuccess: (likedPost) => {
      queryClient.setQueryData<IUser>(['currentUser'], (oldCurrentUser) => {
        return {
          ...oldCurrentUser,
          liked: [...(oldCurrentUser?.liked ?? []), likedPost.data],
        } as IUser;
      });
      updateTotalLike(true);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () =>
      fetch(`/api/post/unlike?postId=${postId}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.setQueryData<IUser>(['currentUser'], (oldCurrentUser) => {
        return {
          ...oldCurrentUser,
          liked: (oldCurrentUser?.liked ?? []).filter(
            (likedPost) => likedPost.post._ref !== postId
          ),
        } as IUser;
      });
      updateTotalLike();
    },
  });

  function updateTotalLike(isLiked: boolean = false) {
    queryClient.setQueryData<InfiniteData<IPost[]>>(
      ['newFeedPosts'],
      (oldData) => {
        const newData = oldData?.pages.map((page) =>
          page.map((item) =>
            item._id === postId
              ? { ...item, likes: item.likes + (isLiked ? 1 : -1) }
              : item
          )
        );
        return { ...oldData, pages: newData } as InfiniteData<IPost[]>;
      }
    );
  }

  const likeLoading = likeMutation.isLoading || unlikeMutation.isLoading;

  return (
    <div className={className}>
      <div className="flex px-3">
        {isPostLiked ? (
          <AiTwotoneHeart
            className="p-2 pl-0 h-10 w-10 scale-110 cursor-pointer fill-red-600"
            onClick={() => !likeLoading && unlikeMutation.mutate()}
          />
        ) : (
          <AiOutlineHeart
            className="p-2 pl-0 h-10 w-10 scale-110 cursor-pointer"
            onClick={() => !likeLoading && likeMutation.mutate()}
          />
        )}
        <TbMessageCircle2
          className="p-2 h-10 w-10 scale-110 cursor-pointer"
          onClick={onOpenModal}
        />
      </div>
      <div className="font-semibold text-sm px-4 mb-2">
        {likes === 0
          ? 'Hãy là người đầu tiên thích bài viết'
          : `${likes} lượt thích`}
      </div>
      <div className="px-4 mb-2">
        <Link href={`/${slug}`} className="font-semibold text-sm mr-1">
          {name}
        </Link>
        <span className="text-sm whitespace-pre">{caption}</span>
      </div>
      {showCommentInput && (
        <CommentForm postId={postId} currentUser={currentUser} />
      )}
    </div>
  );
};

export default ActionBar;
