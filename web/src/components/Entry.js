import React from 'react'
import styled from 'styled-components'
import {toPlainText} from '../lib/helpers'
import Img from 'gatsby-image'
import PortableText from './portableText'
import {Link} from 'gatsby'

const EntryWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding-bottom: 2em;
`

const ImagePost = styled.article`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2em;
  margin-bottom: 2em;
  Img {
    &:hover {
      cursor: pointer;
    }
  }
`

const ImagePostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1em;
  font-family: ${(props) => props.theme.secondaryFont};
`

const ImagePostImageWrapper = styled.div`
  max-height: 75vh;
  overflow: hidden;

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
    max-height: 90%;
    max-width: 90%;
  }

  .overlay:target {
    visibility: visible;
    cursor: pointer;
  }
`

const Divider = styled.hr`
  border: solid 1px ${(props) => props.theme.fontColor};
  width: 2em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`

const EntryList = ({entry}) => {
  return (
    <EntryWrapper>
      <ImagePostInfo>
        <h1 style={{marginBottom: '0'}}>{entry.title}</h1>
        <Divider />
        {entry.portfolioImage && entry.portfolioImage.dimensions && (
          <small>{entry.portfolioImage.dimensions}</small>
        )}
        {entry.portfolioImage && entry.portfolioImage.mediums && (
          <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {entry.portfolioImage.mediums.map((m, i) => (
              <small style={{opacity: 0.75}} key={entry._id + '.' + m.name}>
                <i>{m.name}</i>
                {i !== entry.portfolioImage.mediums.length - 1 && (
                  <span style={{marginLeft: '0.5em', marginRight: '0.5em'}}>|</span>
                )}
              </small>
            ))}
          </div>
        )}
        {entry._rawExcerpt && (
          <small>
            <PortableText blocks={entry._rawExcerpt} />
          </small>
        )}
      </ImagePostInfo>
      <ImagePostImageWrapper>
        <a href={'#fs_' + entry.slug.current}>
          <Img
            alt={entry.title}
            key={entry.portfolioImage.asset.fluid.src}
            imgStyle={{objectFit: 'contain', maxHeight: '75vh'}}
            fluid={entry.portfolioImage.asset.fluid}
          />
        </a>
        <a href='#' className='overlay' id={'fs_' + entry.slug.current}>
          <img
            alt={entry.title}
            key={entry.portfolioImage.asset.fluid.src}
            src={entry.portfolioImage.asset.fluid.src}
          />
        </a>
      </ImagePostImageWrapper>
    </EntryWrapper>
  )
}

export default EntryList
