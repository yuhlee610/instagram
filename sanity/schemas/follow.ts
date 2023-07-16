import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'follow',
  title: 'Follow',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: { type: 'user' },
    }),
    defineField({
      name: 'following',
      title: 'Following',
      type: 'reference',
      to: { type: 'user' },
    }),
    defineField({
      name: 'createdAt',
      title: 'Create at',
      type: 'datetime',
    }),
  ],
});
