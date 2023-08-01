'use client';

import React, { useEffect } from 'react';
import Contacts from '../Contacts/Contacts';
import Chat from '../Chat/Chat';
import useCurrentUser from '@/hooks/useCurrentUser';

const Messenger = () => {
  const currentUser = useCurrentUser();

  useEffect(() => {}, []);

  return (
    <div className="flex h-full">
      <Contacts chats={currentUser?.chats} currentUser={currentUser} />
      <div className="hidden md:block w-full border-l border-gray-200">
        <Chat currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Messenger;
