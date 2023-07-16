'use client';

import { IClassName, IPost, IUser } from '@/types/common';
import React, { useRef, useState } from 'react';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { PiSpinnerGap } from 'react-icons/pi';
import NewFeedPost from '../NewFeedPost/NewFeedPost';

interface IPosts extends IClassName {
  initialPosts: IPost[];
  user: IUser;
}

const PER_PAGE = 3;

const NewFeed = (props: IPosts) => {
  const { initialPosts, user } = props;
  const [posts, setPosts] = useState<IPost[]>(initialPosts);
  const lastPostRef = useRef<IPost | undefined>(
    initialPosts[initialPosts.length - 1]
  );
  const [loading, setLoading] = useState(false);

  const observerHandler = () => {
    const lastPost = lastPostRef.current;

    if (!lastPost) return;

    const { _id, createdAt } = lastPost;

    setLoading(true);

    fetch(
      `/api/post?lastId=${_id}&lastCreatedAt=${createdAt}&perPage=${PER_PAGE}`
    )
      .then((response) => response.json())
      .then((data) => {
        lastPostRef.current = data.data.findLast((post: IPost) => post);
        setPosts((prevPosts) => [...prevPosts, ...data.data]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
  const observerTarget = useInfiniteScroll<HTMLDivElement>(observerHandler);

  return (
    <div className="flex flex-col space-y-4 mb-4 mt-6 w-full justify-center items-center">
      {posts.map((post) => {
        const isPostLiked = !!user.liked.find(
          (likedPost) => likedPost.post._ref === post._id
        );
        return (
          <NewFeedPost
            key={post._id}
            currentUser={user}
            isPostLiked={isPostLiked}
            {...post}
          />
        );
      })}
      <div ref={observerTarget} />
      {loading && (
        <PiSpinnerGap className="animate-spin w-6 h-6 mx-auto mt-4" />
      )}
    </div>
  );
};

export default NewFeed;
