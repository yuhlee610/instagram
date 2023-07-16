import { client } from "../sanity";

const follow = (currentUserId: string, followingId: string) => {
  return client.create({
    _type: 'follow',
    user: {
      _type: 'reference',
      _ref: currentUserId,
    },
    following: {
      _type: 'reference',
      _ref: followingId,
    },
    createdAt: new Date(),
  });
};

export default follow;