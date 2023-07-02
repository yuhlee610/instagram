'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { RiAccountCircleLine, RiAccountCircleFill } from 'react-icons/ri';

interface IProfileLink {
  className?: string;
}

const ProfileLink = (props: IProfileLink) => {
  return (
    <Link
      href={'/profile'}
      className={clsx(
        'cursor-pointer flex p-3 md:hover:bg-stone-200 rounded-xl xl:w-full',
        props.className
      )}
    >
      {false ? (
        <RiAccountCircleFill className="w-7 h-7" />
      ) : (
        <RiAccountCircleLine className="w-7 h-7" />
      )}
      <span
        className={clsx('hidden xl:inline-block ml-3', {
          ['font-bold']: false,
        })}
      >
        Trang cá nhân
      </span>
    </Link>
  );
};

export default ProfileLink;
