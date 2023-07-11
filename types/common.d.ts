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

export interface IComment {
  _id: string;
  author: IUser;
  post: IPostRef;
  content: string;
  createdAt: Date;
  createdAt: Date;
  modifiedAt: Date;
}

export interface ILike {
  _id: string;
  author: IUser;
  post: IPostRef;
  createdAt: Date;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: Image;
  slug: string;
  emailVerified: Date;
  createdAt: Date;
  modifiedAt: Date;
  liked: ILike[];
}

export interface IClassName {
  className?: string;
}

export interface IPost {
  _id: string;
  author: IUser;
  caption: string;
  images: Image[];
  createdAt: Date;
  modifiedAt: Date;
  likes: number;
  comments: IComment[];
}

export interface IAction {
  type: string;
  payload: any;
}