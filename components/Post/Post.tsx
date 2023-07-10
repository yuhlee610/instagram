// 'use client';

import React, { useState } from 'react';
import { IClassName, IPost } from '@/types/common';
import { MediumAvatar } from '../Avatar/Avatar';
import { formatPostCreatedAt } from '@/lib/dates';
import SwiperCarousel from '../SwiperCarousel/SwiperCarousel';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import sanitySdk from '@/services';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
import { TbMessageCircle2 } from 'react-icons/tb';

interface IPostComponent extends IPost, IClassName {
  isPostLiked: boolean;
}

const Post = (props: IPostComponent) => {
  const { _id, author, caption, images, createdAt, likes, isPostLiked } = props;
  const [isLiked, setIsLiked] = useState<boolean>(isPostLiked);
  const [likeTotal, setLikeTotal] = useState<number>(likes);

  const onLike = async () => {
    await fetch('/api/post/like', {
      method: 'POST',
      body: JSON.stringify({ postId: _id }),
    });
    setLikeTotal((prevLikeTotal) => prevLikeTotal + 1);
    setIsLiked((prev) => !prev);
  };

  const onUnlike = async () => {
    await fetch('/api/post/unlike', {
      method: 'DELETE',
      body: JSON.stringify({ postId: _id }),
    });
    setLikeTotal((prevLikeTotal) => prevLikeTotal - 1);
    setIsLiked((prev) => !prev);
  }

  return (
    <div className="w-[470px] pb-5 border-b-[1px] border-b-slate-200">
      <div className="flex items-center space-x-3 py-2 px-1">
        <MediumAvatar image={author.avatar} />
        <div className="font-semibold text-sm">{author.name}</div>
        <div className="text-sm text-slate-400">
          {formatPostCreatedAt(createdAt)}
        </div>
      </div>
      <SwiperCarousel className="h-[585px] bg-slate-50">
        {images.map((image) => (
          <SwiperSlide key={image._key as string}>
            <Image
              className="object-contain"
              src={sanitySdk.urlFor(image).toString()}
              alt="image"
              fill
            />
          </SwiperSlide>
        ))}
      </SwiperCarousel>
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
        <TbMessageCircle2 className="p-2 h-10 w-10 scale-110 cursor-pointer" />
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
    </div>
  );
};

export default Post;
