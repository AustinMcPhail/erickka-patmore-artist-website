import { graphql } from 'gatsby'
import React from 'react'
import Entry from '../components/Entry'

export const query = graphql`
  query EntryTemplateQuery($_id: String!) {
    sanityPortfolioEntry(_id: { eq: $_id }) {
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
`

const EntryTemplate = ({ data: { sanityPortfolioEntry: post } }) => {
  return <Entry entry={post} />
}

export default EntryTemplate
