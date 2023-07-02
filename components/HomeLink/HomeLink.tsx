'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { GoHome, GoHomeFill } from 'react-icons/go';

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
