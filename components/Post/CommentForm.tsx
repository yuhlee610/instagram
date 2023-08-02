'use client';

import React from 'react';
import AutoSizingTextarea from '../AutoSizingTextarea/AutoSizingTextarea';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { IPost, IUser } from '@/types/common';

type CommentFormType = {
  postId: string;
  currentUser: IUser;
  className?: string;
};

type CommentReactHookFormType = {
  comment: string;
};

const CommentForm = (props: CommentFormType) => {
  const {
    postId,
    currentUser,
    className = '',
  } = props;

  const queryClient = useQueryClient();

  const { register, handleSubmit, watch, reset } =
    useForm<CommentReactHookFormType>();

  const { mutateAsync: commentMutate, isLoading } = useMutation({
    mutationFn: async (data: CommentReactHookFormType) => {
      const response = await fetch('/api/post/comment', {
        method: 'POST',
        body: JSON.stringify({ ...data, postId }),
      });
      return await response.json();
    },
    onSuccess(newComment) {
      queryClient.setQueryData<InfiniteData<IPost[]>>(
        ['newFeedPosts'],
        (oldData) => {
          const newData = oldData?.pages.map((page) =>
            page.map((item) => {
              if (item._id === postId) {
                return {
                  ...item,
                  comments: [
                    { ...newComment.data, author: currentUser },
                    ...item.comments,
                  ],
                };
              }
              return item;
            })
          );
          return { ...oldData, pages: newData } as InfiniteData<IPost[]>;
        }
      );
    },
  });

  const onSubmit: SubmitHandler<CommentReactHookFormType> = async (data) => {
    await commentMutate(data);
    reset({ comment: '' });
  };

  const isSubmitButtonActive = !!watch('comment');

  return (
    <div className={`flex h-9 px-4 mb-3 ${className}`}>
      <div className="overflow-y-auto flex-grow gap-2">
        <AutoSizingTextarea
          {...register('comment', { required: true })}
          placeholder="Thêm bình luận"
          className="bg-slate-50 text-sm"
        />
      </div>
      <button
        className={`text-sm font-semibold ${
          isSubmitButtonActive && !isLoading ? 'text-sky-500' : 'text-sky-200'
        }`}
        onClick={handleSubmit(onSubmit)}
        disabled={!isSubmitButtonActive || isLoading}
      >
        Đăng
      </button>
    </div>
  );
};

export default CommentForm;
