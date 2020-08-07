import React from 'react'
import {graphql} from 'gatsby'
import SEO from '../../components/core/seo'
import Layout from '../../components/core/layout'
import {toPlainText} from '../../lib/helpers'

export const query = graphql`
  query CategoryTemplateQuery($slug: String!) {
    posts: allSanityPortfolioEntry(filter: {category: {slug: {current: {eq: $slug}}}}) {
      edges {
        node {
          title
          #   portfolioImage {
          #     asset {
          #       fluid(maxWidth: 400) {
          #         ...GatsbySanityImageFluid
          #       }
          #     }
          #   }
        }
      }
    }
  }
`

const CategoryTemplate = (props) => {
  const {data, errors} = props
  const posts = data && data.post
  return (
    <Layout>
      {errors && <SEO title='GraphQL Error' />}

      {posts && <h1>Hello, world</h1>}

      {/* {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {post && <BlogPost {...post} />} */}
    </Layout>
  )
}

export default CategoryTemplate
