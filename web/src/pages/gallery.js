import React from 'react'
import {graphql} from 'gatsby'
import {ThemeProvider} from 'styled-components'
import {GlobalStyle, theme} from '../lib/styled'
import GraphQLErrorList from '../components/graphql-error-list'
import Layout from '../components/core/layout'
import Home from '../components/EntryList'

export const query = graphql`
  query PortfolioPageQuery {
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
    posts: allSanityPortfolioEntry(
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}}
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
    }
  }
`
const PortfolioPage = (props) => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const posts = data.posts.edges.map((e) => e.node) || []
  const categories = data.categories.edges.map((e) => e.node) || []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  const socials = {
    facebookUrl: site.facebookUrl,
    instagramUrl: site.instagramUrl
  }

  return (
    <Home posts={posts} />
  )
}

export default PortfolioPage
