import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'chat',
  title: 'Chat',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'A recipient or group name',
    }),
    defineField({
      name: 'isGroup',
      title: 'Is a group',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'participants',
      title: 'Participants',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
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
