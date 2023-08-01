import { IMessage, IUser } from '@/types/common';
import React, { FC } from 'react';
import { MediumAvatar } from '../Avatar/Avatar';
import { formatCreatedAt } from '@/lib/dates';

interface IMessageComponent {
  message: IMessage;
  currentUser?: IUser;
  latestMessage: boolean;
}

const Message: FC<IMessageComponent> = (props) => {
  const {
    message: {
      sender: { _id: senderId, name, avatar },
      messageText,
      createdAt,
    },
    currentUser,
    latestMessage,
  } = props;

  const isMyMessage = currentUser?._id === senderId;

  return (
    <div className={`w-fit max-w-[80%] mb-3 ${isMyMessage && 'ml-auto'}`}>
      <div className="flex gap-2">
        {!isMyMessage && <MediumAvatar image={avatar} />}
        <div className="bg-lime-400 px-3 py-2 rounded-xl text-sm">
          {messageText}
        </div>
      </div>
      {latestMessage && (
        <div className="text-xs text-gray-400 text-right mr-2 mt-1">
          {formatCreatedAt(createdAt)}
        </div>
      )}
    </div>
  );
};

export default Message;