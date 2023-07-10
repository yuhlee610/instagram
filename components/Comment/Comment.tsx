import { IClassName, IComment } from '@/types/common';
import React from 'react';
import { MediumAvatar } from '../Avatar/Avatar';
import { formatCreatedAt } from '@/lib/dates';

interface ICommentComponent extends IComment, IClassName {}

const Comment = (props: ICommentComponent) => {
  const { author, content, createdAt } = props;
  return (
    <div className="flex mb-4">
      <MediumAvatar image={author.avatar} />
      <div className="ml-4">
        <div>
          <span className="text-sm font-semibold mr-2">{author.name}</span>
          <span className="text-sm">{content}</span>
        </div>
        <div className="text-xs text-slate-400">
          {formatCreatedAt(createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Comment;
