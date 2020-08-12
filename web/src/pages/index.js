import React from 'react'
import {graphql} from 'gatsby'
import {ThemeProvider} from 'styled-components'
import {GlobalStyle} from '../lib/styled'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/core/seo'
import Layout from '../components/core/layout'
import EntryList from '../components/EntryList'

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
      twitterUrl
      facebookUrl
      instagramUrl
      backgroundColor {
        rgb {
          r
          g
          b
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
          _id
          title
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
          _rawExcerpt(resolveReferences: {maxDepth: 5})
        }
      }
    }
  }
`
const IndexPage = (props) => {
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
    twitterUrl: site.twitterUrl,
    facebookUrl: site.facebookUrl,
    instagramUrl: site.instagramUrl
  }

  return (
    <ThemeProvider
      theme={{
        fontColor: site.fontColor
          ? `rgba(${site.fontColor.rgb.r}, ${site.fontColor.rgb.g}, ${site.fontColor.rgb.b}, ${site.fontColor.rgb.a})`
          : '#2f2f2f',
        backgroundColor: site.backgroundColor
          ? `rgba(${site.backgroundColor.rgb.r}, ${site.backgroundColor.rgb.g}, ${site.backgroundColor.rgb.b}, ${site.backgroundColor.rgb.a})`
          : 'rgba(241, 238, 244, 1)',
        headerBackgroundColor: site.backgroundColor
          ? `rgba(${site.backgroundColor.rgb.r}, ${site.backgroundColor.rgb.g}, ${site.backgroundColor.rgb.b}, 0.75)`
          : 'rgba(241, 238, 244, 0.75)'
      }}
    >
      <GlobalStyle />
      <Layout
        fontColor={site.fontColor}
        siteTitle={site.title}
        categories={categories}
        socials={socials}
      >
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <EntryList posts={posts} />
      </Layout>
    </ThemeProvider>
  )
}

export default IndexPage
