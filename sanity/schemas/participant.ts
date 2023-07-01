import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'participant',
  title: 'Participant',
  type: 'document',
  fields: [
    defineField({
      name: 'chat',
      title: 'Chat',
      type: 'reference',
      to: { type: 'chat' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: { type: 'user' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'joinedAt',
      title: 'Joined at',
      type: 'datetime',
    }),
  ],
});
