'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import css from './Phones.module.css';

const screenshots = [
  { id: 1, src: '/screenshot1-2x.png', alt: 'screenshot1' },
  { id: 2, src: '/screenshot2-2x.png', alt: 'screenshot2' },
  { id: 3, src: '/screenshot3-2x.png', alt: 'screenshot3' },
  { id: 4, src: '/screenshot4-2x.png', alt: 'screenshot4' },
];

const MIN_SCREENSHOT_ID = 1;
const MAX_SCREENSHOT_ID = 4;
const INTERVAL = 5000;

const Phones = () => {
  const [activeImage, setActiveImage] = useState<number>(MIN_SCREENSHOT_ID);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveImage((id) =>
        id >= MAX_SCREENSHOT_ID ? MIN_SCREENSHOT_ID : id + 1
      );
    }, INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={css.homePhones}>
      {screenshots.map(({ id, src, alt }) => (
        <Image
          key={id}
          src={src}
          alt={alt}
          className={clsx(css.screenshot, {
            [css.screenshotActive]: activeImage === id,
          })}
          width={250}
          height={538}
        />
      ))}
    </div>
  );
};

export default Phones;
