import { client } from '../sanity';

const likePost = (userId: string, postId: string) => {
  return client.create({
    _type: 'like',
    author: {
      _type: 'reference',
      _ref: userId,
    },
    post: {
      _type: 'reference',
      _ref: postId,
    },
    createdAt: new Date(),
  });
};

export default likePost;
