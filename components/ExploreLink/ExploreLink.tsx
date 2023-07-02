'use client';

import useActiveLink from '@/hooks/useActiveLink';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { AiOutlineCompass, AiFillCompass } from 'react-icons/ai';

interface IExploreLink {
  className?: string;
}

const EXPLORE_PATH = '/explore';

const ExploreLink = (props: IExploreLink) => {
  const isActive = useActiveLink(EXPLORE_PATH);

  return (
    <Link
      href={EXPLORE_PATH}
      className={clsx(
        'cursor-pointer flex p-3 md:hover:bg-stone-200 rounded-xl xl:w-full',
        props.className
      )}
    >
      {isActive ? (
        <AiFillCompass className="w-7 h-7" />
      ) : (
        <AiOutlineCompass className="w-7 h-7" />
      )}
      <span
        className={clsx('hidden xl:inline-block ml-3', {
          ['font-bold']: isActive,
        })}
      >
        Khám phá
      </span>
    </Link>
  );
};

export default ExploreLink;
