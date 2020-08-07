import {format} from 'date-fns'

export default {
  name: 'portfolioEntry',
  type: 'document',
  title: 'Portfolio Entries',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'The title of this portfolio entry.'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'This is used to create a human-readable link. Hit generate unless you have one in mind.',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      description: 'This determines which page of your portfolio this piece will appear under.',
      to: [
        {
          type: 'category'
        }
      ],
      validation: Rule =>
        Rule.error(
          'You have to choose a category. If you have not created any, please do so first.'
        ).required(),
      options: {
        isHighlighted: true
      }
    },
    {
      name: 'portfolioImage',
      type: 'portfolioImage',
      title: 'Entry Image',
      description: 'The entry / image of the entry to be added to your portfolio.'
    },
    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Excerpt',
      description:
        'Add a bit about the piece. This will end up in summary pages, on Google, when people share your post on social media.'
    },
    {
      name: 'showOnHome',
      type: 'boolean',
      title: 'Display on Home Page',
      description: 'This post will show up on the home page if this is set.'
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'authorReference'
        }
      ]
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published at',
      description: 'When do you want this to be published?'
    }
  ],
  orderings: [
    {
      name: 'publishingDateAsc',
      title: 'Publishing date new–>old',
      by: [
        {
          field: 'publishedAt',
          direction: 'asc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    },
    {
      name: 'publishingDateDesc',
      title: 'Publishing date old->new',
      by: [
        {
          field: 'publishedAt',
          direction: 'desc'
        },
        {
          field: 'title',
          direction: 'asc'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      slug: 'slug',
      media: 'portfolioImage'
    },
    prepare ({title = 'No title', publishedAt, slug = {}, media}) {
      const dateSegment = format(publishedAt, 'YYYY/MM')
      const path = `/${dateSegment}/${slug.current}/`
      return {
        title,
        media,
        subtitle: publishedAt ? path : 'Missing publishing date'
      }
    }
  },
  initialValue: {
    showOnHome: false
  }
}
