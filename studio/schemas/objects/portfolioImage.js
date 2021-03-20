export default {
  name: 'portfolioImage',
  type: 'image',
  title: 'Portfolio Image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'mediums',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'medium' }],
        },
      ],
      title: 'Mediums',
      validation: (Rule) =>
        Rule.error('You have to choose a medium. Add a medium if none are available.').required(),
      options: {
        layout: 'tags',
        isHighlighted: true,
      },
    },
    {
      name: 'dimensions',
      type: 'string',
      title: 'Dimensions',
      options: {
        isHighlighted: true,
      },
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for Google Search-ability and accessiblity (e.g. screen reader)',
      validation: (Rule) => Rule.error('You have to fill out the alternative text.').required(),
      options: {
        isHighlighted: true,
      },
    },
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
    },
  },
}
