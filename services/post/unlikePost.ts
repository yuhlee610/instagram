import { client } from '../sanity';

const unlikePost = (userId: string, postId: string) => {
  return client.delete({
    query:
      '*[_type == "like" && post._ref == $postId && author._ref == $userId]',
    params: {
      userId,
      postId,
    },
  });
};

export default unlikePost;