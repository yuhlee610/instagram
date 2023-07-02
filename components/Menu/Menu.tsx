import clsx from 'clsx';
import React from 'react';
import { FiMenu } from 'react-icons/fi';

interface IMenu {
  className?: string;
}

const Menu = (props: IMenu) => {
  return (
    <div
      className={clsx(
        'cursor-pointer flex p-3 md:hover:bg-stone-200 rounded-xl xl:w-full',
        props.className
      )}
    >
      <FiMenu className="w-6 h-6" />
    </div>
  );
};

export default Menu;
