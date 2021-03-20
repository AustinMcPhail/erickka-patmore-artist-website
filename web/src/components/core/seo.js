import React from 'react'
import Helmet from 'react-helmet'
import { buildImageObj } from '../../lib/helpers'
import { imageUrlFor } from '../../lib/image-url'

const SEO = ({ title, subtitle, description, meta, keywords, image }) => {
  const metaImage = image && image.asset ? imageUrlFor(buildImageObj(image)).width(1200).url() : ''
  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={title}
      titleTemplate={subtitle ? `%s | ${subtitle}` : '%s'}
      meta={[
        {
          name: 'description',
          content: description || '',
        },
        {
          property: 'og:title',
          content: subtitle ? `${title} | ${subtitle}` : title,
        },
        {
          property: 'og:description',
          content: description || '',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: metaImage,
        },
      ]
        .concat(
          keywords && keywords.length > 0
            ? {
                name: 'keywords',
                content: keywords.join(', '),
              }
            : []
        )
        .concat(meta || [])}
    >
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
      </style>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  )
}

export default SEO
