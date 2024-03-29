export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.',
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'facebookUrl',
      type: 'string',
      title: 'Facebook Url',
      description: 'The link to your Facebook page.',
    },
    {
      name: 'instagramUrl',
      type: 'string',
      title: 'Instagram Url',
      description: 'The link to your Instagram feed.',
    },
    {
      name: 'storeUrl',
      type: 'string',
      title: 'Store Url',
      description: 'The link to your Store.',
    },
    {
      name: 'cv',
      type: 'file',
      title: 'CV / Resume',
      description:
        'A copy of your resume / cv that users can download from the CV page.',
    },
    {
      name: 'bio',
      type: 'bodyPortableText',
      title: 'Bio',
      description: 'The biography that appears on the the Cv page of the site.',
    },
    {
      name: 'statement',
      type: 'bodyPortableText',
      title: 'Statement',
      description:
        // eslint-disable-next-line prettier/prettier
        'The statement that appears on the Statement page of the site. Tell \'em what you\'re about.',
    },
    {
      name: 'statementImage',
      type: 'mainImage',
      title: 'Statement Image',
      description: 'Image that appears next to your satement.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Publish an author and set a reference to them here.',
      title: 'Author',
      to: [{ type: 'author' }],
    },
  ],
}
