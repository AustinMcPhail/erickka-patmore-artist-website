import React from 'react'
import {graphql} from 'gatsby'
import styled, {ThemeProvider} from 'styled-components'
import {GlobalStyle} from '../lib/styled'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/core/seo'
import Layout from '../components/core/layout'

export const query = graphql`
  query ReachOutPageQuery {
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
  }
`
const ReachOutPage = (props) => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
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

  const ReachOutWrapper = styled.div`
    display: grid;
    grid-gap: 0.5em;
    grid-template-areas:
      'i f t'
      'c c c';
  `

  const Social = styled.section`
    max-height: 75vh;
    overflow: auto;
    border-radius: 10px;
  `

  const FacebookWrapper = styled(Social)`
    grid-area: f;
  `

  const TwitterWrapper = styled(Social)`
    grid-area: t;
  `

  const InstagramWrapper = styled(Social)`
    grid-area: i;
  `

  const ContactFormWrapper = styled.section`
    grid-area: c;
  `

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
        <ReachOutWrapper>
          <InstagramWrapper>Instagram</InstagramWrapper>
          <FacebookWrapper>Facebook</FacebookWrapper>
          <TwitterWrapper>
            <a
              className='twitter-timeline'
              href='https://twitter.com/Erickkapatmore?ref_src=twsrc%5Etfw'
            >
              Tweets by Erickkapatmore
            </a>
          </TwitterWrapper>
          <ContactFormWrapper>Contact</ContactFormWrapper>
        </ReachOutWrapper>
      </Layout>
    </ThemeProvider>
  )
}

export default ReachOutPage
