'use client';

import useClickOutSide from '@/hooks/useClickOutside';
import React, { useCallback, useEffect, useState } from 'react';

interface IPopover {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  menuClasses?: string;
  displayCondition: 'hover' | 'click';
  onCloseCallback?: Function;
  onOpenCallback?: Function;
}

const Popover = (props: IPopover) => {
  const {
    children,
    displayCondition,
    onOpenCallback = () => {},
    onCloseCallback = () => {},
    menuClasses,
    content,
    className,
  } = props;
  const [isDisplay, setIsDisplay] = useState<boolean>(false);
  const hideTip = useCallback(() => {
    setIsDisplay(false);
    onCloseCallback();
  }, [onCloseCallback]);
  const containerRef = useClickOutSide<HTMLDivElement>(hideTip);

  const showTip = () => {
    setIsDisplay(true);
    onOpenCallback();
  };

  const handleClickChildCpn = () => {
    isDisplay ? hideTip() : showTip();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        hideTip();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [hideTip, containerRef]);

  const wrapperEvent =
    displayCondition === 'hover'
      ? {
          onMouseEnter: showTip,
          onMouseLeave: hideTip,
        }
      : {
          onClick: handleClickChildCpn,
        };
  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      {...wrapperEvent}
    >
      <div>{children}</div>
      {isDisplay && (
        <div
          className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${menuClasses}`}
          role="menu"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
