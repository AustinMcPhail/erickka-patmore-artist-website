import React from 'react'
import {graphql} from 'gatsby'
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components'
import normalize from 'styled-normalize'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/core/seo'
import Layout from '../components/core/layout'
import Img from 'gatsby-image'

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
  fragment SanityImage on SanityMainImage {
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

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    # posts: allSanityPortfolioEntry(
    #   limit: 6
    #   sort: { fields: [publishedAt], order: DESC }
    #   filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    # ) {
    #   edges {
    #     node {
    #       id
    #       publishedAt
    #       portfolioImage {
    #         asset {
    #           _ref
    #         }
    #         medium {
    #           _ref
    #         }
    #         dimensions
    #         alt
    #       }
    #       title
    #       slug {
    #         current
    #       }
    #     }
    #   }
    # }
    entries: *[_type == 'portfolioEntery']{
      _id, title
    }
  }
`

const HomePage = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 10em;
  margin-right: 10em;
`

const ImagePost = styled.article`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
`

const ImagePostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const IndexPage = props => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }
  const site = (data || {}).site
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <ThemeProvider theme={{
      backgroundColor: '#F1EEF4'
    }}>
      <GlobalStyle />
      <Layout siteTitle={site.title}>
        <SEO
          title={site.title}
          description={site.description}
          keywords={site.keywords}
        />
        {/* TODO: Display posts that have "showOnHome" set to true */}
        <HomePage>
          {postNodes.map(p => {
            console.log(p)
            return <h1>Hello</h1>
          })}
          <ImagePost>
            <ImagePostInfo>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus odio facilis corrupti amet provident obcaecati a cum ea expedita autem. Ad dignissimos vero exercitationem, maiores eum, provident tenetur voluptas voluptatibus quisquam quibusdam voluptatum quod dolorum veniam! Voluptatem quasi illo, quo, laudantium ducimus, amet necessitatibus labore blanditiis hic quibusdam totam eos?
              </p>
            </ImagePostInfo>
            {/* <Img fluid={data.file.childImageSharp.fluid} /> */}
          </ImagePost>
        </HomePage>
      </Layout>
    </ThemeProvider>
  )
}

export default IndexPage
