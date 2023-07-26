import { client } from '../sanity';

const unFollow = (currentUserId: string, followingId: string) => {
  return client.delete({
    query:
      '*[_type == "follow" && user._ref == $currentUserId && following._ref == $followingId]',
    params: {
      currentUserId,
      followingId,
    },
  });
};

export default unFollow;
