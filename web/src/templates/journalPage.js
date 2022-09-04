import { isFuture, parseISO } from 'date-fns'
import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import JournalPage from '../components/JournalPage'

const TemplateStyles = styled.div`
  @media (min-width: 1024px) {
    margin-top: 6rem;
  }
`
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
            ...ImageWithPreview
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
  return (
    <TemplateStyles>
      <JournalPage posts={posts} {...props} totalCount={totalCount} />
    </TemplateStyles>
  )
}

export default JournalPageTemplate
