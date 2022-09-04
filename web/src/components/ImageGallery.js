import { isFuture, parseISO } from 'date-fns'
import { Link } from 'gatsby'
import SanityImage from 'gatsby-plugin-sanity-image'
import React, { useEffect } from 'react'
import styled from 'styled-components'

const NewImageGallery = ({ posts, title, setSubtitle }) => {
  useEffect(() => {
    setSubtitle(title)
  }, [title, setSubtitle])
  return (
    <GalleryStyles>
      {posts
        .filter(({ node: p }) => !isFuture(parseISO(p.publishedAt)))
        .map(({ node: p }) => (
          <figure key={p.slug.current}>
            <Link
              key={p.slug.current}
              style={{ maxHeight: '100%' }}
              to={`/gallery/${p.slug.current}`}
            >
              <SanityImage
                {...p.portfolioImage}
                width={400}
                options={{}}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Link>
          </figure>
        ))}
    </GalleryStyles>
  )
}

const GalleryStyles = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }

  column-count: var(--masonry-cols, 1);
  column-gap: var(--content-spacing);

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

  @media (min-width: 481px) {
    --masonry-cols: 2;
  }

  @media (min-width: 1200px) {
    --masonry-cols: 3;
  }
`

export default NewImageGallery
