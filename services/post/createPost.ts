import { IUser } from '@/types/common';
import { client } from '../sanity';

const createPost = (imageAsset: any, caption: string, user: IUser) => {
  return client.create({
    _type: 'post',
    caption,
    images: imageAsset.map((asset: any) => ({
      _type: 'image',
      _key: asset._id,
      asset: {
        _ref: asset._id,
        _type: 'reference',
      },
    })),
    author: {
      _type: 'reference',
      _ref: user._id,
    },
    createdAt: new Date(),
  });
};

export default createPost;
