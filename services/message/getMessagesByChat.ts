import { client } from '../sanity';

const getMessagesByChat = (chatId: string) => {
  return client.fetch(
    `*[_type == "message" && chat._ref == $chatId] | order(createdAt) {
      _id,
      messageText,
      createdAt,
      sender -> {
        _id,
        name,
        avatar
      }
    }`,
    {
      chatId,
    }
  );
};

export default getMessagesByChat;