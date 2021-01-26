import React from 'react'
import {graphql} from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import Layout from '../components/core/layout'

export const query = graphql`
  query NotFoundPageQuery {
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
    }
  }
`
const NotFoundPage = (props) => {
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
    <>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </>
  )
}

export default NotFoundPage
