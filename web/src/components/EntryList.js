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
  padding: 1em;
`

const ImagePostImageWrapper = styled.div`
  max-height: 75vh;
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
                  <h1>{e.title}</h1>
                  {e._rawExcerpt && (
                    <small>
                      <PortableText blocks={e._rawExcerpt} />
                    </small>
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
                  <h1>{e.title}</h1>
                  <small>{toPlainText(e._rawExcerpt)}</small>
                </ImagePostInfo>
              </ImagePostLeft>
            )
          }
        })}
    </EntryListWrapper>
  )
}

export default EntryList
