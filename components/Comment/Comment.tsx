import { IClassName, IComment } from '@/types/common';
import React from 'react';
import { MediumAvatar } from '../Avatar/Avatar';
import { formatCreatedAt } from '@/lib/dates';
import Link from 'next/link';

interface ICommentComponent extends IComment, IClassName {}

const Comment = (props: ICommentComponent) => {
  const { author, content, createdAt } = props;
  return (
    <div className="flex mb-4">
      <Link href={`/${author.slug}`}>
        <MediumAvatar image={author.avatar} />
      </Link>
      <div className="ml-4">
        <div>
          <Link href={`/${author.slug}`}>
            <span className="text-sm font-semibold mr-2">{author.name}</span>
          </Link>
          <span className="text-sm whitespace-pre">{content}</span>
        </div>
        <div className="text-xs text-slate-400">
          {formatCreatedAt(createdAt)}
        </div>
      </div>
    </div>
  );
};

export default Comment;
