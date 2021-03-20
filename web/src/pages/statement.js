import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'
import Layout from '../components/core/layout'
import GraphQLErrorList from '../components/graphql-error-list'
import PortableText from '../components/portableText'

export const query = graphql`
  query StatementPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      _rawStatement(resolveReferences: { maxDepth: 5 })
      author {
        image {
          asset {
            fluid(maxWidth: 400) {
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
      grid-template-areas: 'L R';
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
          box-shadow: 0px 10px 20px 5px black;
        }
        100% {
          transform: translateX(0px);
          opacity: 1;
          box-shadow: 0px 15px 10px -10px black;
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
  const { data, errors } = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const { site } = data || {}

  return (
    <StatementWrapper>
      <div className="statement-container">
        <div className="img-container left">
          <Img alt={site.author.image.asset.fluid} className="fit-image" />
        </div>
        <article className="statement-body right">
          {site._rawStatement && <PortableText blocks={site._rawStatement} />}
        </article>
      </div>
    </StatementWrapper>
  )
}

export default StatementPage
