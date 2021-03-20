import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Entry from '../components/Entry'

const TemplateStyles = styled.div`
  @media (min-width: 1024px) {
    margin-top: 6rem;
  }
`
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

const EntryTemplate = ({ data: { sanityPortfolioEntry: post }, ...props }) => {
  return (
    <TemplateStyles>
      <Entry entry={post} {...props} />
    </TemplateStyles>
  )
}

export default EntryTemplate
