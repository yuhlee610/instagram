import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'message',
  title: 'Message',
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
      name: 'sender',
      title: 'Sender',
      type: 'reference',
      to: { type: 'user' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'messageText',
      title: 'Message text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Create at',
      type: 'datetime',
    }),
  ],
});
