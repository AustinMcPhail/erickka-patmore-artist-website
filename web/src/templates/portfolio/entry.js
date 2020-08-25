import React from 'react'
import {graphql} from 'gatsby'
import SEO from '../../components/core/seo'
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
    post: sanityPortfolioEntry(_id: {eq: $_id}) {
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
    twitterUrl: site.twitterUrl,
    facebookUrl: site.facebookUrl,
    instagramUrl: site.instagramUrl
  }

  return (
    <ThemeProvider theme={theme(site)}>
      <GlobalStyle />
      <Layout
        fontColor={site.fontColor}
        siteTitle={site.title}
        categories={categories}
        socials={socials}
      >
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        {post && <Entry entry={post} />}
      </Layout>
    </ThemeProvider>
  )
}

export default EntryTemplate
