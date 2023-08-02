'use client';

import { IChat, IUser } from '@/types/common';
import React, { useEffect } from 'react';
import { IntermediateAvatar } from '../Avatar/Avatar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { client } from '@/services/sanity';
import { useQueryClient } from '@tanstack/react-query';

interface IContacts {
  chats?: IChat[];
  currentUser?: IUser;
}

const LATEST_MESSAGE_LIMIT = 70;
const query = `*[_type == "chat" && $userId in participants[]._ref]`;

const Contacts = (props: IContacts) => {
  const { chats, currentUser } = props;
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const chatId = searchParams?.get('chatId');

  useEffect(() => {
    const subscription = client
      .listen(query, {
        userId: currentUser?._id,
      })
      .subscribe(() => {
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      });

    return () => subscription.unsubscribe();
  }, [currentUser]);

  return (
    <div className="flex flex-col gap-3 p-3 w-full md:max-w-[360px]">
      {chats?.map((chat) => {
        const { participants, _id, latestMessage } = chat;
        const partner = participants.find(
          (participant) => participant._id !== currentUser?._id
        );
        const { avatar, name } = partner ?? {};
        const latestMessageText = latestMessage?.messageText ?? `${name} muốn nhắn tin với bạn`;
        const displayLatestMessage =
          latestMessageText?.length <= LATEST_MESSAGE_LIMIT
            ? latestMessageText
            : `${latestMessageText?.substring(0, LATEST_MESSAGE_LIMIT)}...`;
        return (
          <Link
            key={_id}
            href={`/inbox?chatId=${_id}`}
            className={`px-2 py-3 flex gap-3 items-center hover:bg-stone-200 cursor-pointer rounded-xl ${
              chatId === _id && 'bg-stone-200'
            }`}
          >
            <IntermediateAvatar image={avatar} />
            <div>
              <div className="text-sm">
                <strong>{name}</strong>
              </div>
              <div className="min-h-[24px] text-sm">{displayLatestMessage}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Contacts;
