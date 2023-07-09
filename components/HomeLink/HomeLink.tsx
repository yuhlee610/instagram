'use client';

import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { GoHome, GoHomeFill } from 'react-icons/go';
import useActiveLink from '@/hooks/useActiveLink';

const HOME_PATH = '/';

interface IHomeLink {
  className?: string;
}

const HomeLink = (props: IHomeLink) => {
  const isActive = useActiveLink(HOME_PATH);

  return (
    <Link
      href={HOME_PATH}
      className={clsx(
        'cursor-pointer flex p-3 md:hover:bg-stone-200 rounded-xl xl:w-full xl:mb-2',
        props.className
      )}
    >
      {isActive ? (
        <GoHomeFill className="w-7 h-7" />
      ) : (
        <GoHome className="w-7 h-7" />
      )}
      <span
        className={clsx('hidden xl:inline-block ml-3', {
          ['font-bold']: isActive,
        })}
      >
        Trang chủ
      </span>
    </Link>
  );
};

export default HomeLink;
