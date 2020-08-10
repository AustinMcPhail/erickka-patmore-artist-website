import React from 'react'
import {graphql} from 'gatsby'
import SEO from '../../components/core/seo'
import Layout from '../../components/core/layout'
import {toPlainText} from '../../lib/helpers'
import {ThemeProvider} from 'styled-components'
import {GlobalStyle} from '../../lib/styled'
import EntryList from '../../components/EntryList'

export const query = graphql`
  query CategoryTemplateQuery($slug: String!) {
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
    currentCategory: sanityCategory(slug: {current: {eq: $slug}}) {
      title
      slug {
        current
      }
    }
    posts: allSanityPortfolioEntry(filter: {category: {slug: {current: {eq: $slug}}}}) {
      edges {
        node {
          title
          portfolioImage {
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

const CategoryTemplate = (props) => {
  const {data, errors} = props
  const site = (data || {}).site
  const categories = (data || {}).categories.edges.map((e) => e.node) || []
  const currentCategory = (data || {}).currentCategory
  const posts = data.posts.edges.map((e) => e.node) || []

  return (
    <ThemeProvider
      theme={{
        backgroundColor: '#F1EEF4'
      }}
    >
      <GlobalStyle />
      <Layout siteTitle={site.title} categories={categories} currentCategory={currentCategory}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        {posts && <EntryList posts={posts} />}
      </Layout>
    </ThemeProvider>
  )
}

export default CategoryTemplate
