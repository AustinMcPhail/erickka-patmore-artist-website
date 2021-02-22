import Img from 'gatsby-image'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import PortableText from './portableText'
import Share from './Share'

const EntryStyles = styled.div`
  margin-top: 0;
  margin-bottom: 4rem;
  @media (min-width: 481px) {
    margin-top: 6rem;
  }

  section {
    .title {
      margin-top: 1rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;

      h2 {
        font-weight: lighter;
      }
      p {
        font-style: italic;
        text-align: right;
      }
    }
  }
`

const Entry = ({ entry, setSubtitle }) => {
  useEffect(() => {
    setSubtitle(entry.title)
  }, [entry.title, setSubtitle])
  return (
    <EntryStyles>
      <Img
        style={{ maxHeight: '75vh' }}
        imgStyle={{ objectFit: 'contain' }}
        fluid={entry.portfolioImage.asset.fluid}
        alt={entry.portfolioImage.alt}
      />
      <section>
        <div className="title">
          <h2>{entry.title}</h2>
          <div>
            {entry.portfolioImage.mediums && entry.portfolioImage.mediums.length > 0 && (
              <p>{entry.portfolioImage.mediums.map((m) => m.name).join(', ')}</p>
            )}
            {entry.portfolioImage.dimensions && <p>{entry.portfolioImage.dimensions}</p>}
          </div>
        </div>
        <Share />
        {entry._rawExcerpt && <PortableText blocks={entry._rawExcerpt} />}
      </section>
    </EntryStyles>
  )
}

export default Entry
