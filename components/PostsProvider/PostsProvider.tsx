import { PostsContext, PostsDispatchContext } from '@/context/PostsContext';
import postReducer, { initialState } from '@/reducer/postReducer';
import React, { useReducer } from 'react'

const PostsProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, dispatch] = useReducer(postReducer, initialState);

  return (
    <PostsContext.Provider value={posts}>
      <PostsDispatchContext.Provider value={dispatch}>
        {children}
      </PostsDispatchContext.Provider>
    </PostsContext.Provider>
  );
};

export default PostsProvider