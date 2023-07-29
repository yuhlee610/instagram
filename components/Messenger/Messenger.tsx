'use client';

import React, { useEffect } from 'react';
import Contacts from '../Contacts/Contacts';
import Chat from '../Chat/Chat';
import useCurrentUser from '@/hooks/useCurrentUser';

const Messenger = () => {
  const currentUser = useCurrentUser();

  useEffect(() => {}, []);

  return (
    <div className="flex">
      <Contacts chats={currentUser?.chats} currentUser={currentUser} />
      <div className="hidden md:block">
        <Chat />
      </div>
    </div>
  );
};

export default Messenger;
