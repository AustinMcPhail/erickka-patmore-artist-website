import React from 'react'
import {graphql} from 'gatsby'
import styled, {ThemeProvider} from 'styled-components'
import {GlobalStyle, theme} from '../lib/styled'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/core/seo'
import Layout from '../components/core/layout'
import Instagram from '../components/Instagram'

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

const ReachOutWrapper = styled.div`
  display: grid;
  grid-gap: 0.5em;
  grid-template-columns: 1fr 1fr;
`

const Social = styled.section`
  max-height: 75vh;
  overflow: auto;
  border-radius: 10px;
`

const InstagramWrapper = styled(Social)``

const ContactFormWrapper = styled.section`
  max-height: 75vh;
  padding: 2rem;
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
        <ReachOutWrapper>
          <ContactFormWrapper>
            <form name='contact' method='POST' data-netlify='true'>
              <div className='field'>
                <label className='label'>
                  Your Name:
                  <input className='input' type='text' name='name' />
                </label>
              </div>
              <div className='field'>
                <label className='label'>
                  Your Email:
                  <input className='input' type='email' name='email' />
                </label>
              </div>
              <div className='field'>
                <label htmlFor='role[]' className='label'>
                  Your Role:
                </label>
                <div className='select is-multiple'>
                  <select name='role[]' multiple size='2'>
                    <option value='leader'>Leader</option>
                    <option value='follower'>Follower</option>
                  </select>
                </div>
              </div>
              <div className='field'>
                <label className='label'>
                  Message:
                  <textarea className='textarea' name='message' />
                </label>
              </div>
              <div className='field'>
                <button className='button is-primary is-medium' type='submit'>
                  Send
                </button>
              </div>
            </form>
          </ContactFormWrapper>
          <InstagramWrapper>
            <Instagram />
          </InstagramWrapper>
        </ReachOutWrapper>
      </Layout>
    </ThemeProvider>
  )
}

export default ReachOutPage
