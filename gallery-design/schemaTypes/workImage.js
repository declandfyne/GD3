export const workImage = {
  name: 'workImage',
  title: 'Work Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().integer().min(1).max(6)
    }
  ],
  preview: {
    select: { title: 'title', media: 'image', order: 'order' },
    prepare({ title, media, order }) {
      return { title: `${order}. ${title}`, media }
    }
  }
}
