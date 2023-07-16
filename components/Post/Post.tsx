'use client';

import React, { useState, MouseEventHandler } from 'react';
import { IClassName, IComment, IPost, IUser } from '@/types/common';
import { MediumAvatar } from '../Avatar/Avatar';
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

interface IPostComponent extends IPost, IClassName {
  onOpenModal: MouseEventHandler<SVGElement>;
  swiperClassName?: string;
  headingClassName?: string;
  actionsClassName?: string;
  showCommentInput?: boolean;
  showComments?: boolean;
  isPostLiked: boolean;
  currentUser: IUser;
}

interface ICommentForm {
  comment: string;
}

const PostComponent = (props: IPostComponent) => {
  const {
    _id,
    author,
    caption,
    images,
    createdAt,
    likes,
    isPostLiked,
    onOpenModal,
    swiperClassName = '',
    headingClassName = '',
    actionsClassName = '',
    className = '',
    showCommentInput = false,
    showComments = false,
    comments: initialComments,
    currentUser,
  } = props;
  const [isLiked, setIsLiked] = useState<boolean>(isPostLiked);
  const [likeTotal, setLikeTotal] = useState<number>(likes);
  const { register, handleSubmit, watch } = useForm<ICommentForm>();
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isSubmitButtonActive = !!watch('comment');

  const onLike = async () => {
    await fetch('/api/post/like', {
      method: 'POST',
      body: JSON.stringify({ postId: _id }),
    });
    setIsLiked((prev) => !prev);
    setLikeTotal((prevLikeTotal) => prevLikeTotal + 1);
  };

  const onUnlike = async () => {
    await fetch('/api/post/unlike', {
      method: 'DELETE',
      body: JSON.stringify({ postId: _id }),
    });
    setIsLiked((prev) => !prev);
    setLikeTotal((prevLikeTotal) => prevLikeTotal - 1);
  };


  const onSubmit: SubmitHandler<ICommentForm> = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/post/comment', {
        method: 'POST',
        body: JSON.stringify({ ...data, postId: _id }),
      });
      const createdComment = await response.json();
      setComments([
        {
          ...createdComment.data,
          author: currentUser,
        },
        ...comments,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${className} grid w-full`}>
      <div
        className={`${headingClassName} flex items-center space-x-3 py-2 px-1`}
      >
        <Link href={`/${author.slug}`} className="font-semibold text-sm">
          <MediumAvatar image={author.avatar} />
        </Link>
        <Link href={`/${author.slug}`} className="font-semibold text-sm">
          {author.name}
        </Link>
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
        <div className="hidden md:block col-span-2 row-start-2 row-end-3 p-4 max-h-[410px] overflow-auto">
          {comments.map((comment) => (
            <Comment key={comment._id} {...comment} />
          ))}
        </div>
      )}
      <div className={`${actionsClassName}`}>
        <div className="flex px-3">
          {isLiked ? (
            <AiTwotoneHeart
              className="p-2 pl-0 h-10 w-10 scale-110 cursor-pointer fill-red-600"
              onClick={onUnlike}
            />
          ) : (
            <AiOutlineHeart
              className="p-2 pl-0 h-10 w-10 scale-110 cursor-pointer"
              onClick={onLike}
            />
          )}
          <TbMessageCircle2
            className="p-2 h-10 w-10 scale-110 cursor-pointer"
            onClick={onOpenModal}
          />
        </div>
        <div className="font-semibold text-sm px-4 mb-2">
          {likeTotal === 0
            ? 'Hãy là người đầu tiên thích bài viết'
            : `${likeTotal} lượt thích`}
        </div>
        <div className="px-4 mb-2">
          <Link href={`/${author.slug}`} className="font-semibold text-sm mr-1">
            {author.name}
          </Link>
          <span className="text-sm">{caption}</span>
        </div>
        {showCommentInput && (
          <div className="flex h-9 px-4">
            <div className="overflow-y-auto flex-grow gap-2">
              <AutoSizingTextarea
                {...register('comment', { required: true })}
                placeholder="Thêm bình luận"
                className="bg-slate-50 text-sm"
              />
            </div>
            <button
              className={`text-sm font-semibold ${
                isSubmitButtonActive && !isSubmitting
                  ? 'text-sky-500'
                  : 'text-sky-200'
              }`}
              onClick={handleSubmit(onSubmit)}
              disabled={!isSubmitButtonActive || isSubmitting}
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
