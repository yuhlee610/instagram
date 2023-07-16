import urlFor from '@/services/image/urlFor';
import Image from 'next/image';
import React from 'react';
import { Image as IImage } from 'sanity';

interface IAvatar {
  image: IImage;
  className?: string;
}

interface IAvatarComponent extends IAvatar {
  sizeClassName: string;
}

const classWithSize = {
  small: 'w-[28px] h-[28px] min-w-[28px]',
  medium: 'w-[38px] h-[38px] min-w-[38px]',
  large: 'w-[77px] h-[77px] min-w-[77px]',
  xlarge: 'w-[150px] h-[150px] min-w-[150px]',
};

const AvatarComponent = (props: IAvatarComponent) => {
  const { image, className, sizeClassName } = props;
  return (
    <div
      className={`rounded-full ${sizeClassName} overflow-hidden relative ${className}`}
    >
      <Image
        src={image ? urlFor(image).url().toString() : '/default-avatar.png'}
        alt="avatar"
        sizes="100%"
        fill
      />
    </div>
  );
};

export const SmallAvatar = (props: IAvatar) => (
  <AvatarComponent {...props} sizeClassName={classWithSize['small']} />
);

export const MediumAvatar = (props: IAvatar) => (
  <AvatarComponent {...props} sizeClassName={classWithSize['medium']} />
);

export const LargeAvatar = (props: IAvatar) => (
  <AvatarComponent {...props} sizeClassName={classWithSize['large']} />
);

export const XLargeAvatar = (props: IAvatar) => (
  <AvatarComponent {...props} sizeClassName={classWithSize['xlarge']} />
);

export const CustomAvatar = AvatarComponent;
