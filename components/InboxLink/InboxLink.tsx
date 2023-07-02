'use client';

import useActiveLink from '@/hooks/useActiveLink';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { BsChatDotsFill, BsChatDots } from 'react-icons/bs';

interface IInboxLink {
  className?: string;
}

const INBOX_PATH = '/inbox';

const InboxLink = (props: IInboxLink) => {
  const isActive = useActiveLink(INBOX_PATH);

  return (
    <Link
      href="/inbox"
      className={clsx(
        'cursor-pointer flex p-3 md:hover:bg-stone-200 rounded-xl xl:w-full',
        props.className
      )}
    >
      {isActive ? (
        <BsChatDotsFill className="w-6 h-6" />
      ) : (
        <BsChatDots className="w-6 h-6" />
      )}
      <span
        className={clsx('hidden xl:inline-block ml-3', {
          ['font-bold']: isActive,
        })}
      >
        Tin nhắn
      </span>
    </Link>
  );
};

export default InboxLink;
