export const hero = {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'headingIntro',
      title: 'Heading Intro',
      type: 'string',
    },
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
    },
    {
      name: 'video',
      title: 'Background Video (overrides image if set)',
      type: 'file',
      options: { accept: 'video/*' },
    }
  ],
  preview: {
    select: { title: 'heading', media: 'image' }
  }
}
