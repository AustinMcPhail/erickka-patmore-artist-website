import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import ImageGallery from '../components/ImageGallery'

export const query = graphql`{
  allSanityPortfolioEntry(
    sort: {publishedAt: DESC}
    filter: {slug: {current: {ne: null}}, showOnHome: {eq: true}}
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
          dimensions
          mediums {
            name
          }
          ...ImageWithPreview
        }
        _rawExcerpt
      }
    }
  }
}`
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
