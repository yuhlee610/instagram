import { IChat, IUser } from '@/types/common';
import React from 'react';
import { IntermediateAvatar } from '../Avatar/Avatar';

interface IContacts {
  chats?: IChat[];
  currentUser?: IUser;
}

const BIO_LIMIT = 80;

const Contacts = (props: IContacts) => {
  const { chats, currentUser } = props;

  return (
    <div className="flex flex-col gap-3 p-3">
      {chats?.map((chat) => {
        const { participants, _id } = chat;
        const partner = participants.find(
          (participant) => participant._id !== currentUser?._id
        );
        const { avatar, name, bio = '' } = partner || {};
        const bioText =
          bio?.length <= BIO_LIMIT ? bio : `${bio?.substring(0, BIO_LIMIT)}...`;
        return (
          <div
            key={_id}
            className="px-2 py-3 flex gap-3 items-center hover:bg-stone-200 cursor-pointer rounded-xl"
          >
            <IntermediateAvatar image={avatar} />
            <div>
              <div className="text-sm">
                <strong>{name}</strong>
              </div>
              <div className="min-h-[24px] text-sm">{bioText}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Contacts;
