import React from 'react';
import { Image } from 'sanity';

export interface ILayout {
  children: React.ReactNode;
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
}

export interface IClassName {
  className?: string;
}