import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'follow',
  title: 'Follow',
  type: 'document',
  fields: [
    defineField({
      name: 'follower',
      title: 'Follower',
      type: 'reference',
      to: { type: 'user' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'following',
      title: 'Following',
      type: 'reference',
      to: { type: 'user' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Create at',
      type: 'datetime',
    }),
  ],
});
