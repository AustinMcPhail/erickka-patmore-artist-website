import React from 'react'
import {graphql, Link} from 'gatsby'
import styled, {ThemeProvider} from 'styled-components'
import {GlobalStyle, theme} from '../lib/styled'
import GraphQLErrorList from '../components/graphql-error-list'
import Layout from '../components/core/layout'

import {imageUrlFor} from '../lib/image-url'
import {buildImageObj} from '../lib/helpers'
import PortableText from '../components/portableText'
import {format} from 'date-fns'

export const query = graphql`
  query JournalPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      ...SiteSettings
    }
    categories: allSanityCategory(filter: { enabled: { ne: false } }) {
      edges {
        node {
          ...Category
        }
      }
    }
    posts: allSanityPost(
      sort: {fields: [publishedAt], order: DESC}
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...MainImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const JournalPage = (props) => {
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

  const socials = {
    facebookUrl: site.facebookUrl,
    instagramUrl: site.instagramUrl
  }

  const JournalListing = styled.div`
    margin-block-start: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    @media (min-width: 1024px) {
      grid-template-columns: 2fr 1fr;
    }

    .divider {
      border: solid 1px ${(props) => props.theme.fontColor};
      width: 100%;
      opacity: .1;
      margin-block-start: 2rem;
      margin-block-end: 2rem;
    }

    .post {
      display: flex;
      flex-wrap: wrap;

      @media (min-width: 1024px) {
        flex-wrap: nowrap;
      }

      margin-block-end: 1rem;

      img {
        width: 100%;
        @media (min-width: 1024px) {
          width: 300px;
        }

        margin-inline-end: 1rem;
        object-fit: contain;
      }

      @media (min-width: 1024px) {
        img + * {
          padding-inline-start: 1rem;
        }
      }

      position: relative;

      & > * {
        position: relative;
        z-index: 1;
      }

      .post-content {
        display: flex;
        flex-direction: column;
        width: 100%;

        justify-content: space-between;

        .title {
          position: relative;
          h2 {
            margin-block-end: 0;
          }
          margin-block-end: .5rem;

          align-self: flex-start;

          transition: all 100ms ease-in-out;
          &:hover, &:focus {
            text-decoration: underline;
            outline: none;
          }
        }

        .date {
          opacity: 0.5;
          margin-block-end: .5rem;
        }

        .read-more {
          align-self: flex-end;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;

          border: solid 1px ${(props) => props.theme.fontColor};
          padding: .25rem 1rem;
          margin-block-start: 1rem;

          border-radius: 25px;

          &:hover, &:focus {
            text-decoration: underline;
            outline: none;

            @keyframes wiggle {
              0% {
                transform: translateX(0);
              }
              50% {
                transform: translateX(5px);
              }
              100% {
                transform: translateX(0);
              }
            }

            svg {
              width: 1rem;
              animation: wiggle 1s infinite;
            }
          }

          svg {
            transition: all 250ms ease-in-out;
            height: 1rem;
            width: 0;
          }
        }
      }
    }

    #posts {
      h1 {
          margin-block-end: 1rem;
          text-decoration: underline;
      }
    }

    #other {
      h1 {
          margin-block-end: 1rem;
          text-decoration: underline;
      }

      text-align: right;
      h2 {
        font-weight: bold;
      }

      ul {
        .heading {
          font-size: 1.1rem;
          font-weight: bold;
        }
        .posting {
        }

        .posting + .heading {
          margin-block-start: 1rem;
        }
      }
    }
  `

  const formatDate = (date) => {
    return format(date, 'MMMM Do, YYYY h:mma')
  }

  const postElements = posts.map((post) => {
    return (
      <>
        <div className='post'>
          {post.mainImage && (
            <img
              className='post-image'
              src={imageUrlFor(buildImageObj(post.mainImage)).auto('format').url()}
              alt={post.mainImage.alt}
            />
          )}
          <div className='post-content'>
            <Link class='title' to={'/journal/' + post.slug.current}><h2>{post.title}</h2></Link>
            <span className='date'>{formatDate(post.publishedAt)}</span>
            <PortableText blocks={post._rawExcerpt} />
            <Link class='read-more' to={'/journal/' + post.slug.current}>Read<svg fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3' /></svg></Link>
          </div>
        </div>
        <hr className='divider' />
      </>
    )
  })

  const monthYear = {}
  posts.forEach(p => {
    const m = format(p.publishedAt, 'MMMM-YYYY')
    if (monthYear[m]) {
      monthYear[m].push(p)
    } else {
      monthYear[m] = [p]
    }
  })

  return (
    <ThemeProvider theme={theme(site)}>
      <GlobalStyle />
      <Layout categories={categories} socials={socials} site={site}>
        <JournalListing>
          <div id='posts'>
            <h1>Recent</h1>
            {postElements}
          </div>
          <div id='other'>
            <h1>All</h1>
            <ul>
              {
                Object.keys(monthYear)
                  .map(my => {
                    return (
                      <>
                        <li className='heading'>{my}</li>
                        {monthYear[my].map(post =>
                          <li className='posting'><Link to={'/journal/' + post.slug.current}>{post.title}</Link> - {format(post.publishedAt, 'DD')}</li>
                        )}
                      </>
                    )
                  })
              }
            </ul>
          </div>
        </JournalListing>
      </Layout>
    </ThemeProvider>
  )
}

export default JournalPage
