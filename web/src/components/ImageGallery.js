import { isFuture } from 'date-fns'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

const ImageGallery = ({ posts }) => (
  <GalleryStyles>
    {posts
      .filter(({ node: p }) => !isFuture(p.publishedAt))
      .map(({ node: p }) => (
        <figure key={p.slug.current}>
          <Link
            key={p.slug.current}
            style={{ maxHeight: '100%' }}
            to={`/gallery/${p.slug.current}`}
          >
            <Img
              style={{ maxHeight: '75vh' }}
              imgStyle={{ objectFit: 'contain' }}
              fluid={p.portfolioImage.asset.fluid}
            />
          </Link>
        </figure>
      ))}
  </GalleryStyles>
)

const GalleryStyles = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }

  column-count: var(--masonry-cols, 1);
  column-gap: 1rem;

  figure {
    margin: 0;
    margin-bottom: 1rem;
    break-inside: avoid;

    a {
      grid-row: 1 / -1;
      grid-column: 1;
      color: black;
      text-decoration: none;
    }
  }

  @media (min-width: 1024px) {
    --masonry-cols: 3;
  }
`

export default ImageGallery
