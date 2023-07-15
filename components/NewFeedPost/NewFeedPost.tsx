import { IPost, IUser } from '@/types/common';
import React, { useState } from 'react';
import Post from '../Post/Post';
import PostDetailModal from '../PostDetailModal/PostDetailModal';

interface INewFeedPost extends IPost {
  currentUser: IUser;
  isPostLiked: boolean;
}

const NewFeedPost = (props: INewFeedPost) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="max-w-[470px] w-full pb-5 md:border-b-[1px] border-b-slate-200">
        <Post
          onOpenModal={() => setIsOpenModal(true)}
          className="grid-cols-1"
          swiperClassName="h-[585px]"
          {...props}
        />
      </div>
      <PostDetailModal
        isOpenModal={isOpenModal}
        onOpenModal={() => setIsOpenModal(true)}
        onClose={() => setIsOpenModal(false)}
        {...props}
      />
    </>
  );
};

export default NewFeedPost;
