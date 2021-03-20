export default {
  name: 'category',
  type: 'document',
  title: 'Category',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'This is used to create a human-readable link. Hit generate unless you have one in mind.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.error('Categories require a slug.').required(),
    },
    {
      name: 'enabled',
      type: 'boolean',
      title: 'Show Category',
      description: 'This category will be available for viewing if this is enabled.',
    },
  ],
  initialValue: {
    enabled: false,
  },
}
