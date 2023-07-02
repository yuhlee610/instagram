'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { FaSquarePlus, FaRegSquarePlus } from 'react-icons/fa6';

interface INewPostLink {
  className?: string;
}

const NewPostLink = (props: INewPostLink) => {
  const searchParams = useSearchParams();
  const isOpenNewPostModal = searchParams?.get('new-post');

  return (
    <Link
      href="?new-post=true"
      className={clsx(
        'cursor-pointer flex p-3 md:hover:bg-stone-200 rounded-xl xl:w-full',
        props.className
      )}
    >
      {isOpenNewPostModal ? (
        <FaSquarePlus className="w-6 h-6" />
      ) : (
        <FaRegSquarePlus className="w-6 h-6" />
      )}
      <span
        className={clsx('hidden xl:inline-block ml-3', {
          ['font-bold']: isOpenNewPostModal,
        })}
      >
        Tạo
      </span>
    </Link>
  );
};

export default NewPostLink;
