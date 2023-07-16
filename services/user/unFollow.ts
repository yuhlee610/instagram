import { client } from '../sanity';

const unFollow = (currentUserId: string, followingId: string) => {
  console.log(currentUserId)
  console.log(followingId);
  console.log('----------------')
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
