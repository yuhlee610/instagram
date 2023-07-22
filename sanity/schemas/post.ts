import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'user' },
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image' }],
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
