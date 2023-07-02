'use client';

import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Portal from '../Portal/Portal';

const KEY_CODE_ESCAPE = 'Escape';

type Props = {
  isOpen: boolean;
  onClose: Function;
  scrollClassName?: string;
  containerClassName?: string;
  iconClassName?: string;
  closeMessage?: string;
  scrollingDisabled?: boolean;
  id: string;
  children: React.ReactNode;
  className: string;
};

const Modal: React.FC<Props> = (props) => {
  const {
    className = '',
    closeMessage,
    children,
    isOpen,
    onClose,
    containerClassName = '',
    iconClassName = '',
    scrollingDisabled = true,
    id,
  } = props;

  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      e.preventDefault();
      if (isOpen && e.key === KEY_CODE_ESCAPE) {
        onClose(e);
      }
    }
    setPortalRoot(
      window?.document && window.document.getElementById('portal-root')
    );

    if (window.document) {
      window.document.body.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, onClose]);

  const handleClose = (event: React.MouseEvent) => {
    if (isOpen) {
      onClose(event);
    }
  };

  const closeButton = (
    <button
      className="absolute top-0 right-1 z-50 p-2 bg-transparent"
      onClick={handleClose}
    >
      <span>{closeMessage}</span>
      <IoClose
        className={
          iconClassName ||
          'inline-block text-white scale-150'
        }
        width={50}
        height={50}
      />
    </button>
  );

  const classes = `${className} ${
    isOpen ? 'inset-0 bg-black/[.7] fixed' : 'hidden'
  }`;
  const containerClasses = `${containerClassName} grows relative flex flex-col h-full top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`;

  return portalRoot ? (
    <Portal portalRoot={portalRoot} scrollingDisabled={scrollingDisabled}>
      <div className={classes} id={id} aria-hidden="true" tabIndex={-1}>
        <div className={containerClasses}>
          {closeButton}
          {children}
        </div>
      </div>
    </Portal>
  ) : null;
};

export default Modal;
