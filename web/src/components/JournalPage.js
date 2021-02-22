import { format, parseISO } from 'date-fns'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import PortableText from './portableText'

const JournalStyles = styled.div`
  margin-top: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
  @media (min-width: 481px) {
    margin-top: 6rem;
    grid-template-columns: 1fr 1fr;
  }

  .post {
    .gatsby-image-wrapper {
      max-height: clamp(100px, 165px, 400px);
    }

    section {
      .title {
        margin-top: var(--content-spacing);
        margin-bottom: var(--content-spacing);
        align-items: center;
        justify-content: space-between;
        gap: 2rem;

        display: flex;

        h2 {
          font-size: 1rem;
        }
        small {
          margin-left: var(--content-spacing);
          font-style: italic;
          text-align: right;
        }
      }
      p {
        font-size: clamp(0.75rem, 2.5vw, 1rem);
      }
      div.read {
        text-align: right;
        a {
          position: relative;
          display: inline-flex;
          align-items: cemter;
          svg {
            transition: all 150ms ease-in-out;
            width: 0rem;
          }
          &:hover {
            svg {
              width: 1rem;
            }
          }
          &.active {
          }
          &:after {
          }
          &:not(.active) {
            &:hover,
            &:focus {
              &:after {
                opacity: 0.75;
                width: 50%;
              }
            }
            &:active {
              &:after {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
`

const JournalPage = ({ posts, setSubtitle, totalCount }) => {
  useEffect(() => {
    setSubtitle('Journal')
  }, [setSubtitle])
  // const formatDate = (date) =>
  //   differenceInDays(new Date(date), new Date()) > 3
  //     ? formatDistance(new Date(date), new Date())
  //     : format(new Date(date), 'MMMM Do, yyyy')

  // const postElements = posts.map((post) => (
  //   <div className="post" key={post._id}>
  //     {post.mainImage && (
  //       <img
  //         className="post-image"
  //         src={imageUrlFor(buildImageObj(post.mainImage)).auto('format').url()}
  //         alt={post.mainImage.alt}
  //       />
  //     )}
  //     <div className="post-content">
  //       <Link className="title" to={`/journal/${post.slug.current}`}>
  //         <h2>{post.title}</h2>
  //       </Link>
  //       <span className="date">{formatDate(parseISO(post.publishedAt))}</span>
  //       <PortableText blocks={post._rawExcerpt} />
  //       <Link className="read-more" to={`/journal/${post.slug.current}`}>
  //         Read
  //         <svg
  //           fill="none"
  //           stroke="currentColor"
  //           viewBox="0 0 24 24"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="2"
  //             d="M17 8l4 4m0 0l-4 4m4-4H3"
  //           />
  //         </svg>
  //       </Link>
  //     </div>
  //   </div>
  // ))

  // const monthYear = {}
  // posts.forEach((p) => {
  //   const m = format(parseISO(p.publishedAt), 'MMMM-yyyy')
  //   if (monthYear[m]) {
  //     monthYear[m].push(p)
  //   } else {
  //     monthYear[m] = [p]
  //   }
  // })
  return (
    <JournalStyles>
      {posts &&
        posts.map((p) => (
          <div className="post">
            <Link to={`/journal/${p.slug.current}`}>
              <Img fluid={p.mainImage.asset.fluid} />
            </Link>
            <section>
              <div className="title">
                <h2>{p.title}</h2>
                <small>{format(parseISO(p.publishedAt), 'dd·MM·yyyy')}</small>
              </div>
              {p._rawExcerpt && <PortableText blocks={p._rawExcerpt} />}
              <div className="read">
                <Link to={`/journal/${p.slug.current}`}>
                  <span>Read</span>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </section>
          </div>
        ))}
    </JournalStyles>
    // <JournalListing>
    //   <div id="posts">
    //     <h1>Recent</h1>
    //     {postElements}
    //   </div>
    //   <div id="other">
    //     <h1>All</h1>
    //     {Object.keys(monthYear).map((my, i) => (
    //       <ul key={i}>
    //         <li className="heading">{my}</li>
    //         {monthYear[my].map((post) => (
    //           <li key={`${my}_${post._id}`}>
    //             <Link className="posting" to={`/journal/${post.slug.current}`}>
    //               {post.title}
    //             </Link>{' '}
    //             - {format(parseISO(post.publishedAt), 'dd')}
    //           </li>
    //         ))}
    //       </ul>
    //     ))}
    //   </div>
    // </JournalListing>
  )
}

export default JournalPage
