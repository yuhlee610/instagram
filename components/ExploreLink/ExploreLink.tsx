'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface IExploreLink {
  className?: string;
}

const EXPLORE_PATH = '/explore';

const ExploreLink = (props: IExploreLink) => {
  const pathname = usePathname();
  const isActive = pathname === EXPLORE_PATH;

  return (
    <Link
      href={EXPLORE_PATH}
      className={clsx(
        'cursor-pointer flex p-3 md:hover:bg-stone-200 rounded-xl xl:w-full',
        props.className
      )}
    >
      <svg
        aria-label="Explore"
        color="rgb(0, 0, 0)"
        fill="rgb(0, 0, 0)"
        height="24"
        role="img"
        viewBox="0 0 24 24"
        width="24"
      >
        {isActive ? (
          <path d="m13.173 13.164 1.491-3.829-3.83 1.49ZM12.001.5a11.5 11.5 0 1 0 11.5 11.5A11.513 11.513 0 0 0 12.001.5Zm5.35 7.443-2.478 6.369a1 1 0 0 1-.57.569l-6.36 2.47a1 1 0 0 1-1.294-1.294l2.48-6.369a1 1 0 0 1 .57-.569l6.359-2.47a1 1 0 0 1 1.294 1.294Z"></path>
        ) : (
          <>
            <polygon
              fill="none"
              points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
            <polygon
              fillRule="evenodd"
              points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"
            />
            <circle
              cx="12.001"
              cy="12.005"
              fill="none"
              r="10.5"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </>
        )}
      </svg>
      <span
        className={clsx('hidden xl:inline-block ml-3', {
          ['font-bold']: isActive,
        })}
      >
        Explore
      </span>
    </Link>
  );
};

export default ExploreLink;
