import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../../components/core/layout'
import GraphQLErrorList from '../../components/graphql-error-list'
import {ThemeProvider} from 'styled-components'
import {GlobalStyle, theme} from '../../lib/styled'
import EntryList from '../../components/EntryList'

export const query = graphql`
  query CategoryTemplateQuery($slug: String!) {
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
      filter: {category: {slug: {current: {eq: $slug}}}}
    ) {
      edges {
        node {
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
            asset {
              fluid(maxWidth: 1200) {
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

const CategoryTemplate = (props) => {
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
  const posts = data.posts.edges.map((e) => e.node) || []

  const socials = {
    facebookUrl: site.facebookUrl,
    instagramUrl: site.instagramUrl
  }

  return (
    <ThemeProvider theme={theme(site)}>
      <GlobalStyle />
      <Layout site={site} categories={categories} socials={socials}>
        {posts && <EntryList posts={posts} />}
      </Layout>
    </ThemeProvider>
  )
}

export default CategoryTemplate
