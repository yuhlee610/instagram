'use client';

import { IClassName } from '@/types/common';
import React, { ChangeEvent, useRef } from 'react';
import { ChangeHandler } from 'react-hook-form';

interface IAutoSizingTextarea extends IClassName {
  placeholder?: string;
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  name: string;
  maxHeight?: number;
}

const AutoSizingTextarea = React.forwardRef<HTMLTextAreaElement, IAutoSizingTextarea>(
  (props, ref) => {
    const { onChange, maxHeight = Infinity, className, ...rest } = props;

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        const scrollHeight = e.target.scrollHeight;
        textareaRef.current.style.height = `${
          scrollHeight > maxHeight ? maxHeight : scrollHeight
        }px`;
      }
      onChange(e);
    };

    return (
      <textarea
        className={`${className} resize-none h-auto w-full outline-none border-none`}
        ref={(e) => {
          if (ref && typeof ref === 'function') {
            ref(e);
          }
          textareaRef.current = e;
        }}
        rows={1}
        onChange={handleChange}
        {...rest}
      />
    );
  }
);

AutoSizingTextarea.displayName = 'AutoSizingTextarea';

export default AutoSizingTextarea;
