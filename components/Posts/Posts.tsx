'use client';

import { IClassName, IPost, IUser } from '@/types/common';
import React, { useEffect, useState } from 'react';
import Post from '../Post/Post';

interface IPosts extends IClassName {
  initialPosts: [IPost];
  user: IUser;
}

const INITIAL_PAGE = 1;

const Posts = (props: IPosts) => {
  const {
    initialPosts,
    user,
  } = props;
  const [posts, setPosts] = useState<[IPost]>(initialPosts);
  const [page, setPage] = useState<number>(INITIAL_PAGE);
  console.log(posts)

  return (
    <div className="flex flex-col space-y-3">
      {posts.map((post) => {
        const isPostLiked = !!user.liked.find(
          (likedPost) => likedPost.post._ref === post._id
        );
        return (
          <Post
            key={post._id}
            currentUser={user}
            isPostLiked={isPostLiked}
            {...post}
          />
        );
      })}
    </div>
  );
};

export default Posts;
