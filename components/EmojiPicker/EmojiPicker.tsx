'use client';

import React, { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FaRegSmileBeam } from 'react-icons/fa';
import { IClassName } from '@/types/common';
import useClickOutSide from '@/hooks/useClickOutside';

interface IEmojiPicker extends IClassName {
  onEmojiSelect: Function;
}

const EmojiPicker = (props: IEmojiPicker) => {
  const { className, onEmojiSelect } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useClickOutSide<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div ref={ref} className={`relative ${className}`}>
      <FaRegSmileBeam
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div
        className={`absolute top-[-420px] left-[26px] ${!isOpen && 'hidden'}`}
      >
        <Picker
          className="absolute"
          data={data}
          onEmojiSelect={onEmojiSelect}
        />
      </div>
    </div>
  );
};

export default EmojiPicker;
