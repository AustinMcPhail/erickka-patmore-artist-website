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
    currentCategory: sanityCategory(slug: {current: {eq: $slug}}) {
      title
      slug {
        current
      }
    }
    posts: allSanityPortfolioEntry(filter: {category: {slug: {current: {eq: $slug}}}}) {
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
        currentCategory={currentCategory}
      >
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        {posts && <EntryList posts={posts} />}
      </Layout>
    </ThemeProvider>
  )
}

export default CategoryTemplate
