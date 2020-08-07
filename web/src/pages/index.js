import React from 'react'
import {graphql} from 'gatsby'
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components'
import normalize from 'styled-normalize'
import {toPlainText} from '../lib/helpers'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/core/seo'
import Layout from '../components/core/layout'
import Img from 'gatsby-image'
import PortableText from '../components/portableText'

const GlobalStyle = createGlobalStyle`
  a{text-decoration:none; color:inherit; cursor:pointer;}
  button{background-color:transparent; color:inherit; border-width:0; padding:0; cursor:pointer;}
  figure{margin:0;}
  input::-moz-focus-inner {border:0; padding:0; margin:0;}
  ul, ol, dd{margin:0; padding:0; list-style:none;}
  h1, h2, h3, h4, h5, h6{margin:0; font-size:inherit; font-weight:inherit;}
  p{margin:0;}
  cite {font-style:normal;}
  fieldset{border-width:0; padding:0; margin:0;}


  ${normalize}

  body {
    background-color: ${(props) => props.theme.backgroundColor};
    font-family: 'Roboto', sans-serif;
  }
`

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    posts: allSanityPortfolioEntry(
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}, showOnHome: {ne: false}}
    ) {
      edges {
        node {
          title
          portfolioImage {
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

const HomePage = styled.section`
  display: flex;
  flex-direction: column;
`

const ImagePost = styled.article`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2em;
  margin-bottom: 2em;
  Img {
    &:hover {
      cursor: pointer;
    }
  }
`

const ImagePostRight = styled(ImagePost)`
  grid-template-columns: 1fr 2fr;
`

const ImagePostLeft = styled(ImagePost)`
  grid-template-columns: 2fr 1fr;
`
const ImagePostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
`

const ImagePostImageWrapper = styled.div`
  max-height: 75vh;
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

  return (
    <ThemeProvider
      theme={{
        backgroundColor: '#F1EEF4'
      }}
    >
      <GlobalStyle />
      <Layout siteTitle={site.title} categories={categories}>
        <SEO title={site.title} description={site.description} keywords={site.keywords} />
        <HomePage>
          {posts &&
            posts.map((e, i) => {
              if (i % 2 === 0) {
                return (
                  <ImagePostRight key={e._id}>
                    <ImagePostInfo>
                      <h1>{e.title}</h1>
                      {e._rawExcerpt && (
                        <small>
                          <PortableText blocks={e._rawExcerpt} />
                        </small>
                      )}
                    </ImagePostInfo>
                    <ImagePostImageWrapper>
                      <Img
                        alt={e.portfolioImage.asset.name}
                        key={e.portfolioImage.asset.fluid.src}
                        imgStyle={{objectFit: 'contain', maxHeight: '75vh'}}
                        fluid={e.portfolioImage.asset.fluid}
                      />
                    </ImagePostImageWrapper>
                  </ImagePostRight>
                )
              } else {
                return (
                  <ImagePostLeft key={e._id}>
                    <ImagePostImageWrapper>
                      <Img
                        alt={e.portfolioImage.asset.name}
                        key={e.portfolioImage.asset.fluid.src}
                        imgStyle={{objectFit: 'contain', maxHeight: '75vh'}}
                        fluid={e.portfolioImage.asset.fluid}
                      />
                    </ImagePostImageWrapper>
                    <ImagePostInfo>
                      <h1>{e.title}</h1>
                      <small>{toPlainText(e._rawExcerpt)}</small>
                    </ImagePostInfo>
                  </ImagePostLeft>
                )
              }
            })}
        </HomePage>
      </Layout>
    </ThemeProvider>
  )
}

export default IndexPage
