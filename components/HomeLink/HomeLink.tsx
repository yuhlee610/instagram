'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const HOME_PATH = '/';

interface IHomeLink {
  className?: string;
}

const HomeLink = (props: IHomeLink) => {
  const pathname = usePathname();
  const isActive = pathname === HOME_PATH;

  return (
    <Link
      href={HOME_PATH}
      className={clsx(
        'cursor-pointer flex p-3 md:hover:bg-stone-200 rounded-xl xl:w-full',
        props.className
      )}
    >
      <svg
        aria-label="Home"
        color="rgb(0, 0, 0)"
        fill="rgb(0, 0, 0)"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        {isActive ? (
          <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z" />
        ) : (
          <path
            d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005Z"
            fill="none"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        )}
      </svg>
      <span
        className={clsx('hidden xl:inline-block ml-3', {
          ['font-bold']: isActive,
        })}
      >
        Home
      </span>
    </Link>
  );
};

export default HomeLink;
