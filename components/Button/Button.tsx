'use client';

import { IClassName } from '@/types/common';
import React, { MouseEventHandler } from 'react';

interface IButton extends IClassName {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode | string;
}

const Button = (props: IButton) => {
  const { children, className, onClick } = props;

  return (
    <button
      onClick={onClick}
      type="button"
      className={`bg-stone-200 py-1 h-8 px-4 rounded-lg text-sm font-semibold hover:bg-stone-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
