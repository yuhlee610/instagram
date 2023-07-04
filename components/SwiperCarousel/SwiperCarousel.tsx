'use client';

import { Swiper, SwiperProps } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import './SwiperCarousel.css';
import { Children, useEffect, useRef, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

interface ISwiperCarousel extends SwiperProps {
  children: React.ReactNode;
  className?: string;
  swiperClassName?: string;
}

function SwiperCarousel(props: ISwiperCarousel) {
  const { children, className, swiperClassName, ...restProps } = props;
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const showNavigation = Children.count(children) > 1;

  useEffect(() => {
    if (swiper && swiper.params) {
      //@ts-ignore
      swiper.params.navigation.prevEl = prevButtonRef.current;
      //@ts-ignore
      swiper.params.navigation.nextEl = nextButtonRef.current;
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <div className={`${className} relative flex flex-row`}>
      <Swiper
        onSwiper={setSwiper}
        grabCursor={true}
        modules={[Pagination, Navigation]}
        className={swiperClassName || 'w-full h-full'}
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
          disabledClass: 'opacity-[0.5]',
        }}
        {...restProps}
      >
        {children}
      </Swiper>
      <div
        className={`absolute top-[50%] lg:translate-[-50%] flex flex-row left-[2%] w-[96%] text-marketplace-color h-fit ${
          showNavigation ? '' : 'hidden'
        }`}
      >
        <button
          ref={prevButtonRef}
          className="z-[10] p-2 rounded-full bg-black/50  duration-200"
        >
          <BsChevronLeft className="text-white" />
        </button>
        <button
          ref={nextButtonRef}
          className="ml-auto z-[10] p-2 rounded-full bg-black/50  duration-200"
        >
          <BsChevronRight className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default SwiperCarousel;
