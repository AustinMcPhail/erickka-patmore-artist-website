import React from 'react'
import { graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import Layout from '../components/core/layout'
import GraphQLErrorList from '../components/graphql-error-list'
import { GlobalStyle, theme } from '../lib/styled'
import { JournalPost } from '../components/JournalPost'

export const query = graphql`
  query JournalPostTemplateQuery($prev_id: String, $curr_id: String!, $next_id: String) {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      facebookUrl
      instagramUrl
      backgroundColor {
        rgb {
          r
          g
          b
          a
        }
        hsl {
          h
          s
          l
          a
        }
      }
      fontColor {
        rgb {
          r
          g
          b
          a
        }
      }
    }
    categories: allSanityCategory(filter: { enabled: { ne: false } }) {
      edges {
        node {
          title
          slug {
            current
          }
        }
      }
    }
    prev: sanityPost(_id: { eq: $prev_id }) {
      _id
      publishedAt
      title
      slug {
        current
      }
    }
    curr: sanityPost(_id: { eq: $curr_id }) {
      _id
      publishedAt
      title
      _rawExcerpt
      _rawBody
      authors {
        author {
          name
        }
      }
      slug {
        current
      }
    }
    next: sanityPost(_id: { eq: $next_id }) {
      _id
      publishedAt
      title
      slug {
        current
      }
    }
  }
`

const JournalPostTemplate = (props) => {
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const { site } = data || {}
  const categories = (data || {}).categories.edges.map((e) => e.node) || []
  const prev = data.prev || null
  const curr = data.curr || {}
  const next = data.next || null

  const socials = {
    facebookUrl: site.facebookUrl,
    instagramUrl: site.instagramUrl,
  }

  return (
    <ThemeProvider theme={theme(site)}>
      <GlobalStyle />
      <Layout site={site} categories={categories} socials={socials}>
        {curr && <JournalPost prev={prev} post={curr} next={next} />}
      </Layout>
    </ThemeProvider>
  )
}

export default JournalPostTemplate
