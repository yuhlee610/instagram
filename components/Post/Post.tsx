'use client';

import React, { MouseEventHandler } from 'react';
import { IClassName, IPost, IUser } from '@/types/common';
import { IntermediateAvatar, MediumAvatar } from '../Avatar/Avatar';
import { formatCreatedAt } from '@/lib/dates';
import SwiperCarousel from '../SwiperCarousel/SwiperCarousel';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import sanitySdk from '@/services';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { TbMessageCircle2 } from 'react-icons/tb';
import AutoSizingTextarea from '../AutoSizingTextarea/AutoSizingTextarea';
import { useForm, SubmitHandler } from 'react-hook-form';
import Comment from '../Comment/Comment';
import Link from 'next/link';
import Popover from '../Popover/Popover';
import Button from '../Button/Button';
import { formatTotalNumber } from '@/lib/posts';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

interface IPostComponent extends IClassName {
  onOpenModal: MouseEventHandler<SVGElement>;
  swiperClassName?: string;
  headingClassName?: string;
  actionsClassName?: string;
  showCommentInput?: boolean;
  showComments?: boolean;
  isPostLiked: boolean;
  currentUser: IUser;
  post: IPost;
}

interface ICommentForm {
  comment: string;
}

const PostComponent = (props: IPostComponent) => {
  const {
    post: {
      _id,
      author: {
        _id: authorId,
        name,
        avatar,
        slug,
        bio,
        postsTotal,
        followers,
        following,
        threeLatestPosts,
      },
      caption,
      images,
      createdAt,
      likes,
      comments,
    },
    isPostLiked,
    onOpenModal,
    swiperClassName = '',
    headingClassName = '',
    actionsClassName = '',
    showCommentInput = false,
    showComments = false,
    currentUser,
    className = '',
  } = props;
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: handleLike,
    onSuccess: (likedPost) => {
      queryClient.setQueryData<IUser>(['currentUser'], (oldCurrentUser) => {
        return {
          ...oldCurrentUser,
          liked: [...(oldCurrentUser?.liked ?? []), likedPost.data],
        } as IUser;
      });
      updateTotalLike({ isLiked: true });
    },
  });
  const unlikeMutation = useMutation({
    mutationFn: handleUnlike,
    onSuccess: () => {
      queryClient.setQueryData<IUser>(['currentUser'], (oldCurrentUser) => {
        return {
          ...oldCurrentUser,
          liked: (oldCurrentUser?.liked ?? []).filter(
            (likedPost) => likedPost.post._ref !== _id
          ),
        } as IUser;
      });
      updateTotalLike({ isLiked: false });
    },
  });
  const { mutateAsync: commentMutate, isLoading } = useMutation({
    mutationFn: handleComment,
    onSuccess(newComment) {
      queryClient.setQueryData<InfiniteData<IPost[]>>(
        ['newFeedPosts'],
        (oldData) => {
          const newData = oldData?.pages.map((page) =>
            page.map((item) => {
              if (item._id === _id) {
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
  const inboxMutation = useMutation({
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
          chats: [],
        } as IUser;
      }),
  });

  const { register, handleSubmit, watch, reset } = useForm<ICommentForm>();
  const isSubmitButtonActive = !!watch('comment');
  const formattedThreeLatestPosts = threeLatestPosts
    ?.map((post) => post.images)
    .flatMap((image) => image);

  async function handleLike() {
    const response = await fetch('/api/post/like', {
      method: 'POST',
      body: JSON.stringify({ postId: _id }),
    });
    return await response.json();
  }

  async function handleUnlike() {
    await fetch(`/api/post/unlike?postId=${_id}`, {
      method: 'DELETE',
    });
  }

  function updateTotalLike({ isLiked }: { isLiked: boolean }) {
    queryClient.setQueryData<InfiniteData<IPost[]>>(
      ['newFeedPosts'],
      (oldData) => {
        const newData = oldData?.pages.map((page) =>
          page.map((item) =>
            item._id === _id
              ? { ...item, likes: item.likes + (isLiked ? 1 : -1) }
              : item
          )
        );
        return { ...oldData, pages: newData } as InfiniteData<IPost[]>;
      }
    );
  }

  async function handleComment(data: ICommentForm) {
    const response = await fetch('/api/post/comment', {
      method: 'POST',
      body: JSON.stringify({ ...data, postId: _id }),
    });
    return await response.json();
  }

  const onSubmit: SubmitHandler<ICommentForm> = async (data) => {
    await commentMutate(data);
    reset({ comment: '' });
  };

  const authorPopupContent = (
    <div className="py-3">
      <div className="flex items-center px-2 gap-2 pb-3">
        <Link href={`/${slug}`} className="font-semibold text-sm">
          <IntermediateAvatar image={avatar} />
        </Link>
        <div>
          <Link href={`/${slug}`} className="font-semibold text-sm">
            {name}
          </Link>
          <div className="text-sm">{bio}</div>
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
            key={image._key + _id}
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
      <Button onClick={() => {}} className="ml-auto mt-3 mr-3 block">
        Nhắn tin
      </Button>
    </div>
  );

  const likeLoading = likeMutation.isLoading || unlikeMutation.isLoading;

  return (
    <div className={`${className} grid w-full`}>
      <div
        className={`${headingClassName} flex items-center space-x-3 py-2 px-1`}
      >
        <Popover
          content={authorPopupContent}
          displayCondition="hover"
          menuClasses="w-[365px] top-[100%] left-0 before:content-[''] before:absolute before:w-full before:h-3 before:bg-transparent before:bottom-[100%]"
        >
          <Link href={`/${slug}`} className="font-semibold text-sm">
            <MediumAvatar image={avatar} />
          </Link>
        </Popover>
        <Popover
          content={authorPopupContent}
          displayCondition="hover"
          menuClasses="w-[365px] top-[100%] left-0 before:content-[''] before:absolute before:w-full before:h-3 before:bg-transparent before:bottom-[100%]"
        >
          <Link href={`/${slug}`} className="font-semibold text-sm">
            {name}
          </Link>
        </Popover>
        <div className="text-sm text-slate-400">
          {formatCreatedAt(createdAt)}
        </div>
      </div>
      <SwiperCarousel className={`bg-slate-50 ${swiperClassName}`}>
        {images.map((image) => (
          <SwiperSlide key={image._key as string}>
            <Image
              className="object-cover"
              src={sanitySdk.urlFor(image).toString()}
              alt="image"
              fill
            />
          </SwiperSlide>
        ))}
      </SwiperCarousel>
      {showComments && (
        <div className="hidden md:block col-span-2 row-start-2 row-end-3 p-4 overflow-auto">
          {comments.map((comment) => (
            <Comment key={comment._id} {...comment} />
          ))}
        </div>
      )}
      <div className={`${actionsClassName}`}>
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
          <div className="flex h-9 px-4 mb-3">
            <div className="overflow-y-auto flex-grow gap-2">
              <AutoSizingTextarea
                {...register('comment', { required: true })}
                placeholder="Thêm bình luận"
                className="bg-slate-50 text-sm"
              />
            </div>
            <button
              className={`text-sm font-semibold ${
                isSubmitButtonActive && !isLoading
                  ? 'text-sky-500'
                  : 'text-sky-200'
              }`}
              onClick={handleSubmit(onSubmit)}
              disabled={!isSubmitButtonActive || isLoading}
            >
              Đăng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostComponent;
