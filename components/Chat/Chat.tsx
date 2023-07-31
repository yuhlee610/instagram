'use client'

import { useSearchParams } from 'next/navigation';
import React from 'react'

const Chat = () => {
  const searchParams = useSearchParams();
  const chatId = searchParams?.get('chatId');

  return (
    <div className='flex items-center justify-center h-full'>
      <div>Hãy chọn một đoạn chat hoặc bắt đầu cuộc trò chuyện mới</div>
    </div>
  );
}

export default Chat