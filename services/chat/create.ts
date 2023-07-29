import { client } from '../sanity';

const createChat = (partnerId: string, currentUserId: string) => {
  return client.create({
    _type: 'chat',
    participants: [
      {
        _type: 'reference',
        _ref: partnerId,
      },
      {
        _type: 'reference',
        _ref: currentUserId,
      },
    ],
    createdAt: new Date(),
  });
};

export default createChat;
