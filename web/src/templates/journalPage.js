import { isFuture, parseISO } from 'date-fns'
import { graphql } from 'gatsby'
import React from 'react'
import JournalPage from '../components/JournalPage'

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 5) {
    allSanityPost(limit: $pageSize, skip: $skip, sort: { fields: [publishedAt], order: DESC }) {
      totalCount
      edges {
        node {
          id
          publishedAt
          title
          _rawExcerpt
          slug {
            current
          }
          mainImage {
            asset {
              fluid(maxWidth: 400) {
                ...GatsbySanityImageFluid
              }
            }
          }
        }
      }
    }
  }
`

const JournalPageTemplate = ({
  data: {
    allSanityPost: { totalCount, edges: allPosts },
  },
  ...props
}) => {
  const posts = allPosts.filter((e) => !isFuture(parseISO(e.node.publishedAt))).map((e) => e.node)
  return <JournalPage posts={posts} {...props} totalCount={totalCount} />
}

export default JournalPageTemplate
