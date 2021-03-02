import { graphql } from 'gatsby'
import React from 'react'
import ImageGallery from '../components/ImageGallery'

export const query = graphql`
  query($slug: String!) {
    sanityCategory(slug: { current: { eq: $slug } }) {
      title
    }
    allSanityPortfolioEntry(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, category: { slug: { current: { eq: $slug } } } }
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

const CategoryTemplate = ({
  data: {
    allSanityPortfolioEntry: { edges: posts },
    sanityCategory: { title },
  },
  setSubtitle,
}) => <ImageGallery posts={posts} title={title} setSubtitle={setSubtitle} />

export default CategoryTemplate