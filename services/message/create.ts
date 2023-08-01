import { client } from '../sanity';

const createMessage = (
  chatId: string,
  currentUserId: string,
  messageText: string
) =>
  client.create({
    _type: 'message',
    chat: {
      _type: 'reference',
      _ref: chatId,
    },
    sender: {
      _type: 'reference',
      _ref: currentUserId,
    },
    messageText,
    createdAt: new Date(),
  });

export default createMessage;
