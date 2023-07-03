import clsx from 'clsx';
import { Swiper } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  Virtual,
  Scrollbar,
  SwiperOptions,
} from 'swiper/core';
import React from 'react';
SwiperCore.use([Navigation, Pagination, Autoplay, Virtual, Scrollbar]);

import css from './SwiperCarousel.module.css';

interface ISwiperCarousel extends SwiperOptions {
  children: React.ReactNode;
  className?: string;
}

function SwiperCarousel(props: ISwiperCarousel) {
  const { children, className, ...restProps } = props;

  return (
    <Swiper className={clsx(css.root, className)} {...restProps}>
      {children}
    </Swiper>
  );
}

export default SwiperCarousel;
