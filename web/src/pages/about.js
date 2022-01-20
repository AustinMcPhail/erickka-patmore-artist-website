import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'
import PortableText from '../components/portableText'

export const query = graphql`
  query AboutPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      _rawStatement
      author {
        image {
          asset {
            fluid(maxWidth: 750, maxHeight: 750) {
              ...GatsbySanityImageFluid
            }
          }
        }
        name
      }
      storeUrl
      cv {
        asset {
          url
        }
      }
    }
  }
`

const AboutStyles = styled.div`
  .statement {
    display: flex;
    flex-direction: column;

    align-items: center;

    gap: calc(2 * var(--content-spacing));

    p {
      a {
        word-wrap: break-all;
      }
    }

    @media (min-width: 1024px) {
      flex-direction: row;
    }

    .gatsby-image-wrapper {
      width: 100%;

      @media (min-width: 1024px) {
        height: 100vh;
      }
    }
  }
`

const ReachOutPage = ({ data: { site } }) => {
  return (
    <AboutStyles>
      <div className="statement">
        <Img alt={site.author.image.alt} fluid={site.author.image.asset?.fluid} />
        <div className="text">
          {site._rawStatement && <PortableText blocks={site._rawStatement} />}
        </div>
      </div>
    </AboutStyles>
  )
}

export default ReachOutPage
