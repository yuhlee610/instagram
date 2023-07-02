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
      validation: (Rule) => Rule.required(),
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
