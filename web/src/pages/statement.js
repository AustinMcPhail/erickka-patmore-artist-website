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
fragment SanityMImage on SanityMainImage {
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
  }
}
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
        ...MainImage
            alt
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

const StatementWrapper = styled.section`
  .statement-container {
    margin-bottom: 4rem;
    display: grid;
    align-items: center;
    gap: 1rem;
    justify-items: center;
    grid-template-areas:
      'R'
      'L';
    @media (min-width: 1024px) {
      grid-template-areas:
        'L R';
    }
    
    .left {
      grid-area: L;
      &.img-container {
        animation: shadowedFadeInFromLeft 1s ease-in-out forwards;
      }
      @keyframes shadowedFadeInFromLeft {
          0% {
            transform: translateX(-10px);
            opacity: 0;
            box-shadow: 0px 10px 20px 5px
            hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 - props.theme.backgroundHsl.s * 100 * 0.5 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 - props.theme.backgroundHsl.l * 100 * 0.5 + '%'}, 0);
          }
          100% {
            transform: translateX(0px);
            opacity: 1;
            box-shadow: 0px 15px 10px -10px
            hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 - props.theme.backgroundHsl.s * 100 * 0.5 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 - props.theme.backgroundHsl.l * 100 * 0.5 + '%'}, 1);
          }
      }
    }

    .right {
      grid-area: R;
      animation: fadeInFromRight 1s ease-in-out forwards;
      @keyframes fadeInFromRight {
        0% {
          transform: translateX(10px);
          opacity: 0;
        }
        100% {
          transform: translateX(0px);
          opacity: 1;
        }
      }
    }

    .statement-body {
      width: 100%;
    }

    .img-container {
      display: grid;
      height: 100%;

      .fit-image {
        transition: filter 0.25s ease-in-out, transform 0.25s ease-in-out;
        max-width: 100%;
        max-height: 75vh;
        margin: auto;
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
          <div className='statement-container'>
            <div className='img-container left'>
              <img
                src={imageUrlFor(buildImageObj(site.statementImage))
                  .auto('format')
                  .url()}
                alt={site.statementImage.alt}
                className='fit-image'
              />
            </div>
            <article className={'statement-body right'}>
              {site._rawStatement && <PortableText blocks={site._rawStatement} />}
            </article>
          </div>
        </StatementWrapper>
      </Layout>
    </ThemeProvider>
  )
}

export default StatementPage
