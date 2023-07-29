'use client';

import React, { useEffect } from 'react';
import Contacts from '../Contacts/Contacts';
import Chat from '../Chat/Chat';

const Messenger = () => {
  useEffect(() => {

  }, [])

  return (
    <div>
      <Contacts />
      <Chat />
    </div>
  );
};

export default Messenger;
