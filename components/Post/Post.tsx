import React, { MouseEventHandler } from 'react';
import { IClassName, IPost, IUser } from '@/types/common';
import { MediumAvatar } from '../Avatar/Avatar';
import { formatCreatedAt } from '@/lib/dates';
import SwiperCarousel from '../SwiperCarousel/SwiperCarousel';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import sanitySdk from '@/services';
import Comment from '../Comment/Comment';
import Link from 'next/link';
import Popover from '../Popover/Popover';
import AuthorPopup from './AuthorPopup';
import ActionBar from './ActionBar';

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

const PostComponent = (props: IPostComponent) => {
  const {
    swiperClassName = '',
    headingClassName = '',
    actionsClassName = '',
    className = '',
    post,
    isPostLiked,
    onOpenModal,
    showCommentInput = false,
    showComments = false,
    currentUser,
  } = props;

  const {
    author: { name, avatar, slug },
    images,
    createdAt,
    comments,
  } = post;

  return (
    <div className={`${className} grid w-full`}>
      <div
        className={`${headingClassName} flex items-center space-x-3 py-2 px-1`}
      >
        <Popover
          content={
            <AuthorPopup
              slug={slug}
              author={post.author}
              currentUser={currentUser}
            />
          }
          displayCondition="hover"
          menuClasses="w-[365px] top-[100%] left-0 before:content-[''] before:absolute before:w-full before:h-3 before:bg-transparent before:bottom-[100%]"
        >
          <Link href={`/${slug}`} className="font-semibold text-sm">
            <MediumAvatar image={avatar} />
          </Link>
        </Popover>
        <Popover
          content={
            <AuthorPopup
              slug={slug}
              author={post.author}
              currentUser={currentUser}
            />
          }
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
      <ActionBar
        className={actionsClassName}
        isPostLiked={isPostLiked}
        post={post}
        currentUser={currentUser}
        onOpenModal={onOpenModal}
        slug={slug}
        showCommentInput={showCommentInput}
      />
    </div>
  );
};

export default PostComponent;
