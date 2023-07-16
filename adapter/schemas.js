'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.verificationToken = exports.account = exports.user = void 0;
exports.user = {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'string',
    },
    {
      name: 'createdAt',
      title: 'Create at',
      type: 'datetime',
    },
    {
      name: 'modifiedAt',
      title: 'Modified at',
      type: 'datetime',
    },
    {
      name: 'emailVerified',
      type: 'datetime',
      hidden: true,
    },
  ],
};
exports.account = {
  name: 'account',
  title: 'Account',
  type: 'document',
  fields: [
    {
      name: 'providerType',
      type: 'string',
    },
    {
      name: 'providerId',
      type: 'string',
    },
    {
      name: 'providerAccountId',
      type: 'string',
    },
    {
      name: 'refreshToken',
      type: 'string',
    },
    {
      name: 'accessToken',
      type: 'string',
    },
    {
      name: 'accessTokenExpires',
      type: 'number',
    },
    {
      name: 'user',
      title: 'User',
      type: 'reference',
      to: { type: 'user' },
    },
  ],
};
exports.verificationToken = {
  name: 'verification-token',
  title: 'Verification Token',
  type: 'document',
  fields: [
    {
      name: 'identifier',
      title: 'Identifier',
      type: 'string',
    },
    {
      name: 'token',
      title: 'Token',
      type: 'string',
    },
    {
      name: 'expires',
      title: 'Expires',
      type: 'datetime',
    },
  ],
};
