'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface IInboxLink {
  className?: string;
}

const INBOX_PATH = '/inbox';

const InboxLink = (props: IInboxLink) => {
  const pathname = usePathname();
  const isActive = pathname === INBOX_PATH;

  return (
    <Link
      href="/inbox"
      className={clsx(
        'cursor-pointer flex p-3 md:hover:bg-stone-200 rounded-xl xl:w-full',
        props.className
      )}
    >
      <svg
        aria-label="Messenger"
        color="rgb(0, 0, 0)"
        fill="rgb(0, 0, 0)"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        <path
          d="M12.003 2.001a9.705 9.705 0 1 1 0 19.4 10.876 10.876 0 0 1-2.895-.384.798.798 0 0 0-.533.04l-1.984.876a.801.801 0 0 1-1.123-.708l-.054-1.78a.806.806 0 0 0-.27-.569 9.49 9.49 0 0 1-3.14-7.175 9.65 9.65 0 0 1 10-9.7Z"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeWidth="1.739"
        />
        <path
          d="M17.79 10.132a.659.659 0 0 0-.962-.873l-2.556 2.05a.63.63 0 0 1-.758.002L11.06 9.47a1.576 1.576 0 0 0-2.277.42l-2.567 3.98a.659.659 0 0 0 .961.875l2.556-2.049a.63.63 0 0 1 .759-.002l2.452 1.84a1.576 1.576 0 0 0 2.278-.42Z"
          fillRule="evenodd"
        />
      </svg>
      <span
        className={clsx('hidden xl:inline-block ml-3', {
          ['font-bold']: isActive,
        })}
      >
        Inbox
      </span>
    </Link>
  );
}

export default InboxLink