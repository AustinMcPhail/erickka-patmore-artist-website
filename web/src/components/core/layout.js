import React from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Header from './header'
import SEO from './seo'

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  gap: var(--content-spacing);
  margin-inline: 1rem;

  @media (min-width: 1024px) {
    margin-inline: clamp(1rem, 25%, 5rem);
    max-height: 100vh;
    overflow-y: hidden;
    grid-template-rows: 1fr auto;
    grid-template-columns: auto 1fr;

    main {
      padding: var(--content-spacing);
      height: 100%;
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
        backgroundColor {
          rgb {
            r
            g
            b
            a
          }
          hsl {
            h
            s
            l
            a
          }
        }
        fontColor {
          rgb {
            r
            g
            b
            a
          }
        }
      }
    }
  `)
  return (
    <LayoutWrapper>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Header
        title={site.title}
        socials={{ instagramUrl: site.instagramUrl, facebookUrl: site.facebookUrl }}
      />
      <main>{children}</main>
      {/* <footer>
        <h3>Footer</h3>
      </footer> */}
    </LayoutWrapper>
  )
}

export default Layout
