'use client';

import { signOut } from 'next-auth/react';
import React from 'react';
import { BiLogOut } from 'react-icons/bi';

const LogoutButton = () => {
  return (
    <button onClick={() => signOut()}>
      <BiLogOut />
      <span>Đăng xuaats</span>
    </button>
  );
};

export default LogoutButton;
