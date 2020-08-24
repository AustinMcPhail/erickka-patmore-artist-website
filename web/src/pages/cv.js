import React from 'react'
import {graphql} from 'gatsby'
import styled, {ThemeProvider} from 'styled-components'
import {GlobalStyle, theme} from '../lib/styled'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/core/seo'
import Layout from '../components/core/layout'

export const query = graphql`
  query CvPageQuery {
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
      cv {
        asset {
          url
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

// const PageWrapper = styled.div`
//   display: grid;
//   grid-gap: 1em;
//   grid-template-columns: 1fr;
//   @media (min-width: 1280px) {
//     grid-template-columns: 1fr 1fr;
//   }
// `

const Cv = styled.section`
  display: flex;
  flex-direction: column;
`
const DownloadWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  justify-content: space-between;
`
const AccentDivider = styled.hr`
  border: solid 1px ${(props) => props.theme.fontColor};
  width: 90%;
  margin: 0;
`

const CvDownload = styled.a`
  padding: 0.5em;
  margin-left: 1em;
  border: solid 2px ${(props) => props.theme.fontColor};
  border-radius: 2px;
  text-align: center;
`

const CvPreview = styled.iframe`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  height: 75vh;
  margin-bottom: 1em;
  -webkit-box-shadow: 0px 14px 23px -11px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 14px 23px -11px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 14px 23px -11px rgba(0, 0, 0, 0.5);
`

const CvPage = (props) => {
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
        {site.cv && (
          <Cv>
            <DownloadWrapper>
              <AccentDivider />
              <CvDownload href={`${site.cv.asset.url}?dl=`}>Download CV</CvDownload>
            </DownloadWrapper>
            <CvPreview
              src={`https://docs.google.com/gview?url=${site.cv.asset.url}&embedded=true`}
              frameBorder={0}
            />
          </Cv>
        )}
      </Layout>
    </ThemeProvider>
  )
}

export default CvPage
