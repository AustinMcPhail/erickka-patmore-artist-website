import { format, parseISO } from 'date-fns'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Pagination from './Pagination'
import PortableText from './portableText'

const JournalStyles = styled.div`
  margin-top: var(--content-spacing);
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  margin-bottom: var(--content-spacing);
  @media (min-width: 481px) {
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
        font-size: clamp(14px, 2.5vw, 1rem);
      }
    }
  }

  div.read {
    text-align: right;
  }
`

const JournalPage = ({ posts, setSubtitle, totalCount, pageContext }) => {
  useEffect(() => {
    setSubtitle('Journal')
  }, [setSubtitle])

  return (
    <>
      <Pagination totalCount={totalCount} {...pageContext} baseUrl="/journal" />
      <JournalStyles>
        {posts &&
          posts.map((p, i) => (
            <div className="post" key={`post_${i}`}>
              {p.mainImage && (
                <Link to={`/journal/${p.slug.current}`}>
                  <Img alt={p.mainImage.alt} fluid={p.mainImage.asset.fluid} />
                </Link>
              )}
              <section>
                <div className="title">
                  <h2>{p.title}</h2>
                  <small>{format(parseISO(p.publishedAt), 'dd·MM·yyyy')}</small>
                </div>
                {p._rawExcerpt && <PortableText blocks={p._rawExcerpt} />}
                <div className="read">
                  <Link className="btn" to={`/journal/${p.slug.current}`}>
                    <span>Read</span>
                  </Link>
                </div>
              </section>
            </div>
          ))}
      </JournalStyles>
    </>
  )
}

export default JournalPage
