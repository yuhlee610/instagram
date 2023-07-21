'use client';

import { IUser } from '@/types/common';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { RiAccountCircleLine, RiAccountCircleFill } from 'react-icons/ri';

interface IProfileLink {
  className?: string;
  currentUser: IUser;
}

const ProfileLink = (props: IProfileLink) => {
  const { currentUser, className = '' } = props;

  return (
    <Link
      href={`/${currentUser.slug}`}
      className={clsx(
        'cursor-pointer flex p-3 md:hover:bg-stone-200 rounded-xl xl:w-full xl:mb-2',
        className
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
