export const hero = {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2
    },
    {
      name: 'image',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: { title: 'heading', media: 'image' }
  }
}
