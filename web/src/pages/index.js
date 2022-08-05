import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import ImageGallery from '../components/ImageGallery'

export const query = graphql`
  query {
    allSanityPortfolioEntry(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } },  showOnHome: { eq: true } }
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
  setSubtitle,
}) => (
  <IndexStyles>
    <ImageGallery posts={posts} setSubtitle={setSubtitle} />
  </IndexStyles>
)

const IndexStyles = styled.div``

export default IndexPage
