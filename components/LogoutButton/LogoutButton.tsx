'use client';

import { useQueryClient } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import React from 'react';
import { BiLogOut } from 'react-icons/bi';

const LogoutButton = () => {
  const queryClient = useQueryClient();

  return (
    <button
      className="flex p-2 p-4 items-center space-x-2"
      onClick={() => {
        signOut();
        queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      }}
    >
      <BiLogOut className="w-5 h-5" />
      <span>Đăng xuất</span>
    </button>
  );
};

export default LogoutButton;
