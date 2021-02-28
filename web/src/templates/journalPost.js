import { graphql } from 'gatsby'
import React from 'react'
import { JournalPost } from '../components/JournalPost'

export const query = graphql`
  query JournalPostTemplateQuery($prev_id: String, $curr_id: String!, $next_id: String) {
    prev: sanityPost(_id: { eq: $prev_id }) {
      title
      slug {
        current
      }
    }
    curr: sanityPost(_id: { eq: $curr_id }) {
      id
      publishedAt
      title
      slug {
        current
      }
      _rawExcerpt
      _rawBody
      mainImage {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
      authors {
        author {
          name
        }
      }
    }
    next: sanityPost(_id: { eq: $next_id }) {
      title
      slug {
        current
      }
    }
  }
`

const JournalPostTemplate = ({ data: { prev, curr, next } }) => (
  <JournalPost prev={prev} post={curr} next={next} />
)

export default JournalPostTemplate
