import { differenceInDays, distanceInWords, format } from 'date-fns'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import PortableText from './portableText'

const Post = styled.article`
  display: flex;
  flex-direction: column;

  .journal-nav {
    display: flex;

    margin-block-end: 1rem;

    .prev {
      margin-inline-end: auto;
    }

    .next {
      margin-inline-start: auto;
    }

    .btn {
      align-self: flex-end;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;

      border: solid 1px ${(props) => props.theme.fontColor};
      padding: 0.25rem 1rem;
      margin-block-start: 1rem;

      border-radius: 25px;

      &:hover,
      &:focus {
        text-decoration: underline;
        outline: none;

        @keyframes wiggleLeft {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-5px);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes wiggleRight {
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

        svg.left {
          width: 1rem;
          animation: wiggleLeft 1s infinite;
        }

        svg.right {
          width: 1rem;
          animation: wiggleRight 1s infinite;
        }
      }

      svg {
        transition: all 250ms ease-in-out;
        height: 1rem;
        width: 0;
      }
    }
  }

  .title {
    font-size: 3rem;
    align-self: center;
  }

  .publishDate {
    align-self: center;
    margin-block-end: 1rem;
    opacity: 0.5;
  }

  .image-container {
    margin-block-end: 1rem;
    text-align: center;
    img {
      width: 100%;
    }
    .caption {
      opacity: 0.75;
    }
  }

  .content {
    display: flex;
    flex-direction: column;

    align-self: center;
    width: min(100%, 750px);

    .body {
      margin-block-end: 1rem;
    }

    .post-footer {
      display: flex;
      justify-content: space-between;
      .share {
        display: flex;
        align-items: center;
        *:not(:last-child) {
          margin-inline-end: 1rem;
        }
      }
      .author {
        height: 4rem;
        display: inline-flex;
        align-items: center;
        align-self: flex-end;

        img {
          height: 100%;
          width: auto;
          margin-inline-end: 0.5rem;

          border: solid ${(props) => props.theme.backgroundColor} 2px;
          border-radius: 50%;
        }

        p {
          opacity: 0.5;
        }
      }
    }
  }
`

const IconSvg = styled.svg`
  fill: ${(props) => props.theme.fontColor};
`

export const JournalPost = ({ prev, post, next }) => {
  const { title, mainImage, _rawBody, publishedAt, authors } = post
  const url = typeof window !== 'undefined' ? window.location.href : ''
  return (
    <Post>
      <div className="journal-nav">
        {prev && (
          <Link className="prev btn" to={`/journal/${prev.slug.current}`}>
            <svg
              className="left"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            {prev.title}
          </Link>
        )}
        {next && (
          <Link className="next btn" to={`/journal/${next.slug.current}`}>
            {next.title}
            <svg
              className="right"
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
        )}
      </div>
      <h1 className="title">{title}</h1>
      {publishedAt && (
        <div className="publishDate">
          {differenceInDays(new Date(publishedAt), new Date()) > 3
            ? distanceInWords(new Date(publishedAt), new Date())
            : format(new Date(publishedAt), 'MMMM Do, YYYY')}
        </div>
      )}
      {mainImage && mainImage.asset && (
        <div className="image-container">
          <img
            src={imageUrlFor(buildImageObj(mainImage)).auto('format').url()}
            alt={mainImage.alt}
          />
          {mainImage.caption && <p className="caption">{mainImage.caption}</p>}
        </div>
      )}
      <div className="content">
        {_rawBody && (
          <div className="body">
            <PortableText blocks={_rawBody} />
          </div>
        )}
        <div className="post-footer">
          <div className="share">
            <span>Share with</span>
            <a
              href={`https://twitter.com/intent/tweet/?url=${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconSvg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24px"
                  height="24px"
                >
                  <path d="M24,4.3c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2C19.3,2.6,18,2,16.6,2 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,7.8,4.1,5.9,1.7,2.9C1.2,3.6,1,4.5,1,5.4c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.4,1.6,9.2,1,8.9c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.2,23.3,5.3,24,4.3" />
                </svg>
              </IconSvg>
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconSvg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24px"
                height="24px"
              >
                <path d="M 21.800781 0 L 2.199219 0 C 1 0 0 1 0 2.199219 L 0 21.800781 C 0 23 1 24 2.199219 24 L 12 24 L 12 14 L 9 14 L 9 11 L 12 11 L 12 8 C 12 5.5 13 4 16 4 L 19 4 L 19 7 L 17.699219 7 C 16.800781 7 16 7.800781 16 8.699219 L 16 11 L 20 11 L 19.5 14 L 16 14 L 16 24 L 21.800781 24 C 23 24 24 23 24 21.800781 L 24 2.199219 C 24 1 23 0 21.800781 0 Z" />
              </IconSvg>
            </a>
          </div>
          {authors[0] && (
            <aside className="author">
              {authors[0].author.image && authors[0].author.image.asset && (
                <img
                  src={imageUrlFor(buildImageObj(authors[0].author.image)).fit('crop').url()}
                  alt=""
                />
              )}
              <div>
                <p>Authored by</p>
                <p>{authors[0].author.name || <em>Missing name</em>}</p>
              </div>
            </aside>
          )}
        </div>
      </div>
    </Post>
  )
}
