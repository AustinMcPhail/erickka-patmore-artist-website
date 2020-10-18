import React from 'react'
import styled from 'styled-components'
import {buildImageObj} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'

const EntryWrapper = styled.section`
  display: flex;
  flex-direction: column;
  text-align: center;

  #title {
    font-weight: bold;
    margin-block-end: 1rem;
  }
  #info {
    display: flex;
    justify-content: center;
    margin-block-end: 1rem;
    font-style: italic;

    p:not(:last-child)::after {
      content: "|";
      padding-inline-start: .5rem;
      padding-inline-end: .5rem;
    }
  }
  #excerpt {
    align-self: center;
    margin-block-end: 1rem;
    max-width: 50%;
  }

  .img-container {
    display: grid;
    height: 100%;

    .fit-image {
      transition: filter 0.25s ease-in-out, transform 0.25s ease-in-out;
      max-width: 100%;
      max-height: 95vh;
      margin: auto;
    }
  }

  .overlay {
    /* Display over the entire page */
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);

    /* Horizontal and vertical centering of the image */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    /* We hide all this by default */
    visibility: hidden;
  }

  .overlay img {
    max-height: 95vh;
    max-width: 95vh;
  }

  .overlay:target {
    visibility: visible;
    cursor: pointer;
  }
`

const EntryList = ({entry}) => {
  return (
    <EntryWrapper>
      <h1 id='title'>{entry.title}</h1>
      <div id='info'>
        {entry.publishedAt && <p id='date'>{entry.publishedAt.split('-')[0]}</p>}
        {entry.portfolioImage && entry.portfolioImage.dimensions && (
          <p id='dimensions'>{entry.portfolioImage.dimensions}</p>
        )}
        {entry.portfolioImage && entry.portfolioImage.mediums && (
          <p className='mediums'>
            {entry.portfolioImage.mediums.map(m => m.name).join(', ')}
          </p>
        )}
      </div>
      {entry._rawExcerpt && (<div id='excerpt'>
        <PortableText blocks={entry._rawExcerpt} />
      </div>)}
      <a className='img-container' href={'#fs_' + entry.slug.current}>
        <img
          src={imageUrlFor(buildImageObj(entry.portfolioImage))
            .auto('format')
            .url()}
          alt={entry.portfolioImage.alt}
          className='fit-image'
        />
      </a>
      <a href='#' className='overlay' id={'fs_' + entry.slug.current}>
        <img
          src={imageUrlFor(buildImageObj(entry.portfolioImage))
            .auto('format')
            .url()}
          alt={entry.portfolioImage.alt}
          className='fit-image'
        />
      </a>
    </EntryWrapper>
  )
}

export default EntryList
