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
import Modal from '../Modal/Modal';
import AutoSizingTextarea from '../AutoSizingTextarea/AutoSizingTextarea';
import { useForm, SubmitHandler } from 'react-hook-form';
import Comment from '../Comment/Comment';

interface IPostComponentWrapper extends IPost, IClassName {
  isPostLiked: boolean;
  currentUser: IUser;
}

interface IPostComponent extends IPostComponentWrapper {
  onClickComment: MouseEventHandler<SVGElement>;
  swiperClassName?: string;
  headingClassName?: string;
  actionsClassName?: string;
  showCommentInput?: boolean;
  showComments?: boolean;
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
    onClickComment,
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
        <MediumAvatar image={author.avatar} />
        <div className="font-semibold text-sm">{author.name}</div>
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
            onClick={onClickComment}
          />
        </div>
        <div className="font-semibold text-sm px-4 mb-2">
          {likeTotal === 0
            ? 'Hãy là người đầu tiên thích bài viết'
            : `${likeTotal} lượt thích`}
        </div>
        <div className="px-4 mb-2">
          <span className="font-semibold text-sm mr-1">{author.name}</span>
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

const PostWrapper = (props: IPostComponentWrapper) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <div className="w-[470px] pb-5 md:border-b-[1px] border-b-slate-200">
      <PostComponent
        {...props}
        onClickComment={() => setIsOpenModal(true)}
        className="grid-cols-1"
        swiperClassName="h-[585px]"
      />
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        id={`post-detail-${props._id}`}
      >
        <div className="h-full flex items-center justify-center">
          <div className="w-[470px] md:w-[80%] md:max-w-[916px] md:h-[80%] xl:h-[741px] bg-slate-50 rounded-md">
            <PostComponent
              onClickComment={() => setIsOpenModal(true)}
              className="grid-cols-1 md:grid-cols-2 md:grid-rows-[70px_1fr_150px] h-full"
              headingClassName="md:col-start-2 md:col-end-3 md:pl-4 md:border-b-[1px] md:border-b-slate-200"
              swiperClassName="h-[490px] md:h-full md:col-span-1 md:row-start-1 md:row-end-4"
              actionsClassName="md:col-span-2 md:row-start-3 md:border-t-[1px] md:border-t-slate-200"
              showCommentInput
              showComments
              {...props}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostWrapper;
