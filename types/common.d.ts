import React from 'react';
import { Image } from 'sanity';

export interface ILayout {
  children: React.ReactNode;
}

export interface IReference {
  _ref: string;
}

export interface IPostRef extends IPost, IReference {
}

export interface IFollow {
  _id: string;
  createdAt: Date;
  user: IReference;
  following: IReference;
}

export interface IComment {
  _id: string;
  author: IUser;
  post: IPostRef;
  content: string;
  createdAt: string;
  createdAt: string;
  modifiedAt: string;
}

export interface ILike {
  _id: string;
  author: IUser;
  post: IPostRef;
  createdAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: Image;
  slug: string;
  emailVerified: string;
  createdAt: string;
  modifiedAt: string;
  bio: string;
  liked: ILike[];
  posts: IPost[];
  following: IFollow[];
  followers: IFollow[];
}

export interface IClassName {
  className?: string;
}

export interface IPost {
  _id: string;
  author: IUser;
  caption: string;
  images: Image[];
  createdAt: string;
  modifiedAt: string;
  likes: number;
  comments: IComment[];
}

export interface IAction {
  type: string;
  payload: any;
}