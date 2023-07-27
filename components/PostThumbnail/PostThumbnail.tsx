'use client';

import sanitySdk from '@/services';
import { IPost, IUser } from '@/types/common';
import Image from 'next/image';
import React, { useState } from 'react';
import { TbMessageCircle2 } from 'react-icons/tb';
import { AiTwotoneHeart } from 'react-icons/ai';
import PostDetailModal from '../PostDetailModal/PostDetailModal';
import { formatTotalNumber } from '@/lib/posts';

interface IPostThumbnail {
  currentPost: IPost;
  currentUser: IUser;
}

const PostThumbnail = (props: IPostThumbnail) => {
  const {
    currentPost: { images, _id, likes, comments },
    currentUser,
  } = props;
  const [isMouseEnter, seIsMouseEnter] = useState<boolean>(false);
  const [isOpenPostDetail, setIsOpenPostDetail] = useState<boolean>(false);

  const isLiked = !!currentUser.liked.find(
    (likedPost) => likedPost.post._ref === _id
  );

  const onMouseOver = () => {
    seIsMouseEnter(true);
  };

  const onMouseLeave = () => {
    seIsMouseEnter(false);
  };

  return (
    <div className='relative after:content-[""] after:block after:pb-[100%]'>
      <div
        className="absolute w-full h-full"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onClick={() => setIsOpenPostDetail(true)}
      >
        <Image
          src={sanitySdk.urlFor(images[0]).toString()}
          alt="thumbnail"
          sizes="100%"
          fill
        />
        <div
          className={`${
            isMouseEnter ? 'flex' : 'hidden'
          } absolute w-full h-full z-0 bg-black/30 cursor-pointer items-center justify-center gap-8`}
        >
          <div className="flex text-white font-semibold">
            <AiTwotoneHeart className="h-6 w-6 cursor-pointer fill-white mr-2" />
            {formatTotalNumber(likes)}
          </div>
          <div className="flex text-white font-semibold">
            <TbMessageCircle2 className="h-6 w-6 cursor-pointer fill-white text-white mr-2" />
            {formatTotalNumber(comments.length)}
          </div>
        </div>
      </div>
      <PostDetailModal
        isOpenModal={isOpenPostDetail}
        onOpenModal={() => setIsOpenPostDetail(true)}
        onClose={() => setIsOpenPostDetail(false)}
        currentUser={currentUser}
        isPostLiked={isLiked}
        post={props.currentPost}
        showCommentInput
        showComments
      />
    </div>
  );
};

export default PostThumbnail;
