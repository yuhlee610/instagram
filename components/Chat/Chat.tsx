'use client';

import { IMessage, IUser } from '@/types/common';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { FC, useEffect } from 'react';
import Message from '../Message/Message';
import { SubmitHandler, useForm } from 'react-hook-form';
import AutoSizingTextarea from '../AutoSizingTextarea/AutoSizingTextarea';
import { RiSendPlaneFill } from 'react-icons/ri';
import { client } from '@/services/sanity';

interface IChatComponent {
  currentUser?: IUser;
}

interface IMessageForm {
  message: string;
  chatId: string;
}

const query = `*[_type == "message" && chat._ref == $chatId] | order(createdAt) {
      _id,
      messageText,
      createdAt,
      sender
    }`;

const Chat: FC<IChatComponent> = (props) => {
  const { currentUser } = props;
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const chatId = searchParams?.get('chatId');

  const { register, handleSubmit, reset } = useForm<IMessageForm>();

  const { data: messages, isLoading } = useQuery<IMessage[]>(
    ['message', chatId],
    async () => {
      const response = await fetch(`/api/message?chatId=${chatId}`);
      const data = await response.json();
      return data.data;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  const { mutateAsync: messageMutateAsync } = useMutation({
    mutationFn: (data: IMessageForm) =>
      fetch('/api/message', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });

  useEffect(() => {
    const subscription = client
      .listen(query, { chatId })
      .subscribe((update) => {
        const newMessage = update.result;
        queryClient.setQueryData<IMessage[]>(
          ['message', chatId],
          (oldMessage) => {
            return [...(oldMessage ?? []), newMessage] as IMessage[];
          }
        );

        queryClient.setQueryData<IUser>(['currentUser'], (oldCurrentUser) => {
          const newChats = oldCurrentUser?.chats?.map((chat) => {
            if (chat._id === chatId) {
              return {
                ...chat,
                latestMessage: newMessage,
              };
            }
            return chat;
          });
          return {
            ...oldCurrentUser,
            chats: newChats,
          } as IUser;
        });
      });

    return () => subscription.unsubscribe();
  }, [chatId]);

  const onSendMessage: SubmitHandler<IMessageForm> = async (data) => {
    await messageMutateAsync(data);
    reset({ message: '' });
  };

  if (!chatId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div>Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div>Đang tải</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 flex-1 overflow-y-auto">
        {messages?.map((message, index) => (
          <Message
            key={message._id}
            message={message}
            currentUser={currentUser}
            latestMessage={index === messages.length - 1}
          />
        ))}
      </div>
      <div className="px-3 py-2 flex w-full gap-3">
        <div className="bg-slate-100 py-2 px-3 rounded-2xl flex-1">
          <AutoSizingTextarea
            {...register('message', { required: true })}
            placeholder="Aa"
            className="bg-slate-100 text-sm"
            maxHeight={100}
          />
          <input
            type="text"
            hidden
            {...register('chatId', { value: chatId })}
          />
        </div>
        <RiSendPlaneFill
          className="w-6 h-6 fill-lime-400 mt-auto mb-1 cursor-pointer"
          onClick={handleSubmit(onSendMessage)}
        />
      </div>
    </div>
  );
};

export default Chat;
