import { IAction, IPost } from '@/types/common';

export const LOAD_INITIAL_POSTS = 'LOAD_INITIAL_POSTS';

export const initialState: IPost[] = [];

export default function postReducer(posts: IPost[], action: IAction) {
  switch (action.type) {
    case LOAD_INITIAL_POSTS:
      return [...posts, ...action.payload];

    default:
      return posts;
  }
}
