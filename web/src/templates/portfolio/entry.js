import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../../components/core/layout'
import GraphQLErrorList from '../../components/graphql-error-list'
import {ThemeProvider} from 'styled-components'
import {GlobalStyle, theme} from '../../lib/styled'
import Entry from '../../components/Entry'

export const query = graphql`
  query EntryTemplateQuery($_id: String!) {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
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
    categories: allSanityCategory(filter: {enabled: {ne: false}}) {
      edges {
        node {
          title
          slug {
            current
          }
        }
      }
    }
    post: sanityPortfolioEntry(_id: {eq: $_id}) {
      publishedAt
      _id
      title
      slug {
        current
      }
      portfolioImage {
        ...SanityImage
        alt
        dimensions
        mediums {
          name
        }
      }
      _rawExcerpt
    }
  }
`

const EntryTemplate = (props) => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const site = (data || {}).site
  const categories = (data || {}).categories.edges.map((e) => e.node) || []
  const post = data.post || {}

  const socials = {
    facebookUrl: site.facebookUrl,
    instagramUrl: site.instagramUrl
  }

  return (
    <ThemeProvider theme={theme(site)}>
      <GlobalStyle />
      <Layout site={site} categories={categories} socials={socials}>
        {post && <Entry entry={post} />}
      </Layout>
    </ThemeProvider>
  )
}

export default EntryTemplate
