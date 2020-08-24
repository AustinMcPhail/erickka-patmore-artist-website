import React, {useEffect} from 'react'
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
        hsl {
          h
          s
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

const ReachOutWrapper = styled.div``

const Social = styled.section``

const InstagramWrapper = styled(Social)`
  .heading {
    display: flex;
    align-items: center;
    margin-block-end: 1rem;

    hr {
      width: 100%;
    }

    h3 {
      text-align: center;
      width: 50%;
      margin-inline-start: 1rem;
      margin-inline-end: 1rem;
    }
  }
`

const ContactFormWrapper = styled.form`
  padding: 2rem;
  label {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    margin-bottom: 20px;

    .input-label {
      transition: transform 0.1s ease-in-out;
      transform: translateY(20px);
    }
    .input-label-raised {
      transition: transform 0.1s ease-in-out;
      transform: translateY(-5px);
    }

    input {
      caret-color: ${(props) => props.theme.fontColor};
      background: none;
      border: none;
      color: ${(props) => props.theme.fontColor};
      border-bottom: 2px solid ${(props) => props.theme.fontColor};
    }
    input:focus {
      outline: none;
    }

    textarea {
      line-height: 27px;
      border: none;
      outline: none;
      color: ${(props) => props.theme.fontColor};
      background: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent 26px,
        ${(props) => props.theme.fontColor} 27px
      );
      background-attachment: local;
    }
  }
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

  useEffect(() => {
    if (document) {
      const els = document.getElementsByClassName('input-field')
      Array.prototype.forEach.call(els, function (el) {
        el.addEventListener('focusin', (event) => {
          event.target.previousSibling.classList.add('input-label-raised')
        })
        el.addEventListener('focusout', (event) => {
          if (event.target.value) {
            event.target.previousSibling.classList.remove('input-label')
            event.target.previousSibling.classList.add('input-label-raised')
            // event.target.previousSibling.style = 'transform: translateY(-5px);'
          } else {
            event.target.previousSibling.classList.remove('input-label-raised')
            event.target.previousSibling.classList.add('input-label')
            // event.target.previousSibling.classList.add()
          }
        })
      })
    }
  }, [])

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
          <ContactFormWrapper method='post' action='#'>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <label style={{marginRight: '1rem'}}>
                <span className='input-label'>Name</span>
                <input className='input-field' type='text' id='name' required />
              </label>
              <label>
                <span className='input-label'>Subject</span>
                <input className='input-field' type='text' id='subject' required />
              </label>
            </div>
            <label>
              <span className='input-label'>Message</span>
              <textarea className='input-label' name='message' id='message' rows='3' required />
            </label>
            <label>
              <span className='input-label'>Contact</span>
              <input className='input-field' type='email' id='contact' required />
            </label>
            <button type='submit'>Send</button>
            <input type='reset' value='Clear' />
          </ContactFormWrapper>
          <InstagramWrapper>
            <div className='heading'>
              <hr />
              <h3>Instagram</h3>
              <hr />
            </div>
            <Instagram />
          </InstagramWrapper>
        </ReachOutWrapper>
      </Layout>
    </ThemeProvider>
  )
}

export default ReachOutPage
