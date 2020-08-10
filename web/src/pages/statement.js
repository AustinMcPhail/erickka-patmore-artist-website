import React from 'react'
import {graphql} from 'gatsby'
import {ThemeProvider} from 'styled-components'
import {GlobalStyle} from '../lib/styled'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/core/seo'
import Layout from '../components/core/layout'

export const query = graphql`
  query StatementPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    categories: allSanityCategory {
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
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}, showOnHome: {ne: false}}
    ) {
      edges {
        node {
          title
          portfolioImage {
            asset {
              fluid(maxWidth: 1200) {
                ...GatsbySanityImageFluid
              }
            }
          }
          _rawExcerpt(resolveReferences: {maxDepth: 5})
        }
      }
    }
  }
`
const StatementPage = (props) => {
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

  return (
    <ThemeProvider
      theme={{
        backgroundColor: '#F1EEF4'
      }}
    >
      <GlobalStyle />
      <Layout siteTitle={site.title} categories={categories}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
      </Layout>
    </ThemeProvider>
  )
}

export default StatementPage
