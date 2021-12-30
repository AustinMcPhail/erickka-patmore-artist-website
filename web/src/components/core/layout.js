import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import styled from 'styled-components'
import Header from './header'
import SEO from './seo'

const LayoutWrapper = styled.div`
  display: grid;
  column-gap: var(--content-spacing);
  margin-inline: 1rem;

  &.disabled {
    main {
      pointer-events: none;
      filter: grayscale(75%);
    }
  }

  @media (min-width: 1024px) {
    margin-inline: clamp(1rem, 25%, 5rem);
    max-height: 100vh;
    overflow-y: hidden;
    grid-template-rows: 1fr auto;
    grid-template-columns: auto 1fr;

    main {
      padding-inline: var(--content-spacing);
      /* height: 100%; */
      overflow-y: auto;
    }
  }

  @media (min-width: 1500px) {
    margin-inline: clamp(1rem, 25%, 15rem);
  }

  header,
  footer {
    padding-inline: var(--content-spacing);
  }
`

const Layout = ({ children }) => {
  const { site } = useStaticQuery(graphql`
    query {
      site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
        title
        description
        keywords
        facebookUrl
        instagramUrl
        storeUrl
        cv {
          asset {
            url
          }
        }
      }
    }
  `)

  const [subtitle, setSubtitle] = useState(null)

  const [blurBackground, setBlurBackground] = useState(false)

  return (
    <LayoutWrapper className={blurBackground ? 'disabled' : ''}>
      <SEO
        title={site.title}
        subtitle={subtitle}
        description={site.description}
        keywords={site.keywords}
      />
      <Header
        title={site.title}
        socials={{ instagramUrl: site.instagramUrl, facebookUrl: site.facebookUrl }}
        blurBackground={setBlurBackground}
        cvUrl={site.cv.asset.url}
        storeUrl={site.storeUrl}
      />
      <main className={blurBackground ? 'disabled' : ''}>
        {React.Children.map(children, (child) => React.cloneElement(child, { setSubtitle }))}
      </main>
      {/* <footer>
        <h3>Footer</h3>
      </footer> */}
    </LayoutWrapper>
  )
}

export default Layout
