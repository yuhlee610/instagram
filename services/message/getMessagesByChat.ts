import { client } from '../sanity';

const getMessagesByChat = (chatId: string) => {
  return client.fetch(
    `*[_type == "message" && chat._ref == $chatId] | order(createdAt) {
      _id,
      messageText,
      createdAt,
      sender,
      chat -> {
        participants[] -> {
          _id,
          avatar,
          name
        }
      }
    }`,
    {
      chatId,
    }
  );
};

export default getMessagesByChat;
