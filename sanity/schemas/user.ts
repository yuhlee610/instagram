import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
    }),
    defineField({
      name: 'emailVerified',
      type: 'datetime',
      hidden: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Create at',
      type: 'datetime',
    }),
    defineField({
      name: 'modifiedAt',
      title: 'Modified at',
      type: 'datetime',
    }),
  ],
});
