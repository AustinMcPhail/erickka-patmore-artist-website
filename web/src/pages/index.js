import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

const { isFuture } = require('date-fns')

export const query = graphql`
  query {
    allSanityPortfolioEntry(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, showOnHome: { ne: false } }
    ) {
      edges {
        node {
          publishedAt
          _id
          title
          slug {
            current
          }
          portfolioImage {
            alt
            dimensions
            mediums {
              name
            }
            asset {
              fluid(maxWidth: 400) {
                ...GatsbySanityImageFluid
              }
            }
          }
          _rawExcerpt
        }
      }
    }
  }
`
const IndexPage = ({
  data: {
    allSanityPortfolioEntry: { edges: posts },
  },
  errors,
}) => (
  <IndexStyles>
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
  </IndexStyles>
)

const IndexStyles = styled.div`
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

export default IndexPage
