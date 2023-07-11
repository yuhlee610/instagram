import { IAction, IPost } from '@/types/common';
import { createContext } from 'react';

export const PostsContext = createContext<IPost[]>([]);
export const PostsDispatchContext = createContext<React.Dispatch<IAction>>(
  () => null
);
