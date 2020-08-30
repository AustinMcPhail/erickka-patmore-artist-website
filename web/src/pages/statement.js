import React from 'react'
import {graphql} from 'gatsby'
import styled, {ThemeProvider} from 'styled-components'
import {GlobalStyle, theme} from '../lib/styled'
import GraphQLErrorList from '../components/graphql-error-list'
import Layout from '../components/core/layout'
import PortableText from '../components/portableText'
import {imageUrlFor} from '../lib/image-url'
import {buildImageObj} from '../lib/helpers'

export const query = graphql`
  query StatementPageQuery {
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
      _rawStatement(resolveReferences: {maxDepth: 5})
      statementImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
          fluid(maxWidth: 400) {
            ...GatsbySanityImageFluid
          }
        }
      }
      author {
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
        name
      }
    }
  }
`

const StatementWrapper = styled.article`
  display: grid;
  grid-template-areas:
    's'
    'i';
  gap: 1rem;

  @media (min-width: 1280px) {
    grid-template-areas: 'i s s s';
  }

  #statementImage {
    grid-area: i;
  }

  #statement {
    grid-area: s;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    <ThemeProvider theme={theme(site)}>
      <GlobalStyle />
      <Layout site={site} categories={[]} socials={socials}>
        <StatementWrapper>
          {site.statementImage && site.statementImage.asset && (
            <div id='statementImage'>
              <img
                src={imageUrlFor(buildImageObj(site.statementImage))
                  .width(400)
                  .height(Math.floor((9 / 16) * 1000))
                  .fit('crop')
                  .auto('format')
                  .url()}
                alt={'Statement Splash Image'}
              />
            </div>
          )}
          <div id='statement'>
            {site._rawStatement && <PortableText blocks={site._rawStatement} />}
          </div>
        </StatementWrapper>
      </Layout>
    </ThemeProvider>
  )
}

export default StatementPage
