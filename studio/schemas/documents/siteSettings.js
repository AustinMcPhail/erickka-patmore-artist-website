export default {
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  __experimental_actions: ['update', /* 'create', 'delete', */ 'publish'],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your blog for search engines and social media.'
    },
    {
      name: 'keywords',
      type: 'array',
      title: 'Keywords',
      description: 'Add keywords that describes your blog.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'backgroundColor',
      type: 'color',
      title: 'Choose a Background Color',
      description: 'The background color of your site.'
    },
    {
      name: 'fontColor',
      type: 'color',
      title: 'Choose a Font Color',
      description: 'The main font color of your site.'
    },
    {
      name: 'twitterUrl',
      type: 'string',
      title: 'Twitter Url',
      description: 'The link to your Twitter profile'
    },
    {
      name: 'facebookUrl',
      type: 'string',
      title: 'Facebook Url',
      description: 'The link to your Facebook page'
    },
    {
      name: 'instagramUrl',
      type: 'string',
      title: 'Instagram Url',
      description: 'The link to your Instagram feed'
    },
    {
      name: 'cv',
      type: 'file',
      title: 'CV / Resume',
      description: 'A copy of your resume / cv that users can download from the CV page'
    },
    {
      name: 'Bio',
      type: 'bodyPortableText',
      title: 'Bio',
      description: 'The biography that appears on the the Cv page of the site'
    },
    {
      name: 'author',
      type: 'reference',
      description: 'Publish an author and set a reference to them here.',
      title: 'Author',
      to: [{type: 'author'}]
    }
  ]
}
