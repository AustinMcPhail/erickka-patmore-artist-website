import React from 'react'
import styled from 'styled-components'
import {toPlainText} from '../lib/helpers'
import Img from 'gatsby-image'
import PortableText from './portableText'

const EntryListWrapper = styled.section`
  display: flex;
  flex-direction: column;
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

const ImagePostRight = styled(ImagePost)`
  grid-template-columns: 1fr 2fr;
`

const ImagePostLeft = styled(ImagePost)`
  grid-template-columns: 2fr 1fr;
`
const ImagePostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1em;
  font-family: 'Cutive Mono', monospace;
`

const ImagePostImageWrapper = styled.div`
  max-height: 75vh;
  overflow: hidden;
`

const Divider = styled.hr`
  border: solid 1px ${(props) => props.theme.fontColor};
  width: 2em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`

const EntryList = ({posts}) => {
  if (!posts || posts.length === 0) {
    // TODO: Empty State
  }

  return (
    <EntryListWrapper>
      {posts &&
        posts.map((e, i) => {
          if (i % 2 === 0) {
            return (
              <ImagePostRight key={e._id}>
                <ImagePostInfo>
                  <h1 style={{marginBottom: '0'}}>{e.title}</h1>
                  <Divider />
                  {e._rawExcerpt && (
                    <small>
                      <PortableText blocks={e._rawExcerpt} />
                    </small>
                  )}
                  {e.portfolioImage && e.portfolioImage.dimensions && (
                    <small>{e.portfolioImage.dimensions}</small>
                  )}
                  {e.portfolioImage && e.portfolioImage.mediums && (
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                      {e.portfolioImage.mediums.map((m, i) => (
                        <small style={{opacity: 0.5}} key={e._id + '.' + m.name}>
                          <i>{m.name}</i>
                          {i !== e.portfolioImage.mediums.length - 1 && (
                            <span style={{marginLeft: '0.5em', marginRight: '0.5em'}}>|</span>
                          )}
                        </small>
                      ))}
                    </div>
                  )}
                </ImagePostInfo>
                <ImagePostImageWrapper>
                  <Img
                    alt={e.portfolioImage.asset.name}
                    key={e.portfolioImage.asset.fluid.src}
                    imgStyle={{objectFit: 'contain', maxHeight: '75vh'}}
                    fluid={e.portfolioImage.asset.fluid}
                  />
                </ImagePostImageWrapper>
              </ImagePostRight>
            )
          } else {
            return (
              <ImagePostLeft key={e._id}>
                <ImagePostImageWrapper>
                  <Img
                    alt={e.portfolioImage.asset.name}
                    key={e.portfolioImage.asset.fluid.src}
                    imgStyle={{objectFit: 'contain', maxHeight: '75vh'}}
                    fluid={e.portfolioImage.asset.fluid}
                  />
                </ImagePostImageWrapper>
                <ImagePostInfo>
                  <h1 style={{marginBottom: '0'}}>{e.title}</h1>
                  {/* TODO: Turn into styled thing */}
                  <Divider />
                  {e._rawExcerpt && (
                    <small>
                      <PortableText blocks={e._rawExcerpt} />
                    </small>
                  )}
                  {e.portfolioImage && e.portfolioImage.dimensions && (
                    <small>{e.portfolioImage.dimensions}</small>
                  )}
                  {e.portfolioImage && e.portfolioImage.mediums && (
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                      {e.portfolioImage.mediums.map((m, i) => (
                        <small style={{opacity: 0.5}} key={e._id + '.' + m.name}>
                          <i>{m.name}</i>
                          {i !== e.portfolioImage.mediums.length - 1 && (
                            <span style={{marginLeft: '0.5em', marginRight: '0.5em'}}>|</span>
                          )}
                        </small>
                      ))}
                    </div>
                  )}
                </ImagePostInfo>
              </ImagePostLeft>
            )
          }
        })}
    </EntryListWrapper>
  )
}

export default EntryList
