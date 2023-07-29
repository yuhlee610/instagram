import { IUser } from '@/types/common';

export const isCreatedChatWith = (currentUser?: IUser, partner?: IUser) => {
  return !!currentUser?.chats?.find((chat) =>
    chat.participants.find((participant) => participant._id === partner?._id)
  );
};
