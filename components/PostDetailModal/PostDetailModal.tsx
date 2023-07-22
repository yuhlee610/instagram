'use client';

import React, { MouseEventHandler } from 'react';
import Modal from '../Modal/Modal';
import { IClassName, IPost, IUser } from '@/types/common';
import PostComponent from '../Post/Post';

interface IPostDetailModal extends IPost, IClassName {
  isOpenModal: boolean;
  onClose: Function;
  onOpenModal: MouseEventHandler<SVGElement>;
  swiperClassName?: string;
  headingClassName?: string;
  actionsClassName?: string;
  showCommentInput?: boolean;
  showComments?: boolean;
  isPostLiked: boolean;
  currentUser: IUser;
}

const PostDetailModal = (props: IPostDetailModal) => {
  const {
    isOpenModal,
    onClose,
    swiperClassName = '',
    headingClassName = '',
    actionsClassName = '',
    className = '',
    ...rest
  } = props;
  return (
    <Modal
      isOpen={isOpenModal}
      onClose={onClose}
      id={`post-detail-${props._id}`}
    >
      <div className="h-full flex items-center justify-center">
        <div className="w-[470px] md:w-[80%] md:max-w-[916px] md:h-[80%] xl:h-[741px] bg-slate-50 rounded-md">
          <PostComponent
            className={`${className} grid-cols-1 md:grid-cols-2 md:grid-rows-[70px_1fr_150px] h-full`}
            headingClassName={`${headingClassName} md:col-start-2 md:col-end-3 md:pl-4 md:border-b-[1px] md:border-b-slate-200`}
            swiperClassName={`${swiperClassName} h-[490px] md:h-full md:col-span-1 md:row-start-1 md:row-end-4`}
            actionsClassName={`${actionsClassName} md:col-span-2 md:row-start-3 md:border-t-[1px] md:border-t-slate-200`}
            showCommentInput
            showComments
            {...rest}
          />
        </div>
      </div>
    </Modal>
  );
};

export default PostDetailModal;
