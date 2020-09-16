import React from 'react'
import styled from 'styled-components'
import {buildImageObj} from '../lib/helpers'
import PortableText from './portableText'
import {Link} from 'gatsby'
import {imageUrlFor} from '../lib/image-url'

const Divider = styled.hr`
  border: solid 1px ${(props) => props.theme.fontColor};
  opacity: 0.25;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  animation: expand 1s ease-in-out forwards;

  @keyframes expand {
    0% {
      width: 0%;
    }
    100% {
      width: 100%
    }
  }
`

const NewEntryListWrapper = styled.section`
  .entry-container {
    margin-bottom: 4rem;
    display: grid;
    align-items: center;
    gap: 1rem;
    justify-items: center;
    grid-template-areas: 'L R';
    .left {
      grid-area: L;
      animation: fadeInFromLeft 1s ease-in-out forwards;
      text-align: left;
      &.img-container {
        animation: shadowedFadeInFromLeft 1s ease-in-out forwards;
        @keyframes shadowedFadeInFromLeft {
          0% {
            transform: translateX(-10px);
            opacity: 0;
            box-shadow: 0px 10px 20px 5px
            hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 - props.theme.backgroundHsl.s * 100 * 0.5 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 - props.theme.backgroundHsl.l * 100 * 0.5 + '%'}, 0);
          }
          100% {
            transform: translateY(0px);
            opacity: 1;
            box-shadow: 0px 15px 10px -10px
            hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 - props.theme.backgroundHsl.s * 100 * 0.5 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 - props.theme.backgroundHsl.l * 100 * 0.5 + '%'}, 1);
          }
        }
      }
      @keyframes fadeInFromLeft {
        0% {
          transform: translateX(-10px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
    }
    .right {
      grid-area: R;
      animation: fadeInFromRight 1s ease-in-out forwards;
      text-align: right;
      &.img-container {
        animation: shadowedFadeInFromRight 1s ease-in-out forwards;
        @keyframes shadowedFadeInFromRight {
          0% {
            transform: translateX(10px);
            opacity: 0;
            box-shadow: 0px 10px 20px 5px
            hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 - props.theme.backgroundHsl.s * 100 * 0.5 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 - props.theme.backgroundHsl.l * 100 * 0.5 + '%'}, 0);
          }
          100% {
            transform: translateY(0px);
            opacity: 1;
            box-shadow: 0px 15px 10px -10px
            hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 - props.theme.backgroundHsl.s * 100 * 0.5 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 - props.theme.backgroundHsl.l * 100 * 0.5 + '%'}, 1);
          }
        }
      }
      @keyframes fadeInFromRight {
        0% {
          transform: translateX(10px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
    }

    @media (max-width: 1024px) {
      display: flex;
      flex-direction: column;
      .left, .right {
        text-align: center;
        margin-bottom: 1rem;
      }
    }

    .entry-info {
      width: 100%;
      .title {
        margin-bottom: 0;
        small {
          font-size: .5em;
          opacity: 0.75;
        }
      }

      .info {
        font-style: italic;
        font-size: 0.75rem;
        margin-bottom: 1rem;
      }
      
      .excerpt {
        font-size: 0.75rem;
      }
    }

    .img-container {
      display: grid;
      height: 100%;

        &:hover, &:focus {
          .fit-image {
            transform: scale(1.01);
            filter: blur(1px);
          }
        }

      .fit-image {
        transition: filter 0.25s ease-in-out, transform 0.25s ease-in-out;
        max-width: 100%;
        max-height: 75vh;
        margin: auto;
      }
    }
  }
`
const getPlacement = (index, flipped) => {
  if (index % 2 === 0) return flipped ? 'right' : 'left'
  return flipped ? 'left' : 'right'
}

const EntryList = ({posts}) => {
  return (
    <NewEntryListWrapper>
      {posts && posts.map((post, i) => {
        return (post.portfolioImage && post.portfolioImage.asset && (
          <div className='entry-container' key={post._id}>
            <article className={'entry-info ' + getPlacement(i, false)}>
              <h1 className='title'>{post.title}<small>{post.publishedAt && ` ${post.publishedAt.split('-')[0]}`}</small></h1>
              <Divider />
              <p className='info'>
                {post.portfolioImage.dimensions ? post.portfolioImage.dimensions : ''}
                {post.portfolioImage.dimensions && post.portfolioImage.mediums ? ' | ' : ''}
                {post.portfolioImage.mediums && post.portfolioImage.mediums.length > 0 ? post.portfolioImage.mediums.map(m => m.name).join(', ') : ''}
              </p>
              {post._rawExcerpt && (
                <p className='excerpt'>
                  <PortableText blocks={post._rawExcerpt} />
                </p>
              )}
            </article>
            <Link to={`/portfolio/${post.slug.current}`} className={'img-container ' + getPlacement(i, true)}>
              <img
                src={imageUrlFor(buildImageObj(post.portfolioImage))
                  .auto('format')
                  .url()}
                alt={post.portfolioImage.alt}
                className='fit-image'
              />
            </Link>
          </div>
        ))
      })}
    </NewEntryListWrapper>
  )
}

export default EntryList
