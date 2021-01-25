import React, {useEffect} from 'react'
import Header from './header'
import styled from 'styled-components'
import SEO from './seo'

const LayoutWrapper = styled.div`
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
  
  header, footer {
    padding-inline: var(--content-spacing);
  }
`

const Layout = ({children, site, categories, socials}) => {
  // return (
  //   <LayoutWrapper>
  //     <SEO title={site.title} description={site.description} keywords={site.keywords} />
  //     <main>{children}</main>
  //     <footer style={{display: 'flex', justifyContent: 'flex-end', opacity: '0.5', paddingTop: '2rem'}}>
  //       Site by <a style={{marginLeft: '2px', marginRight: '2px'}} target='_blank' rel='noopener noreferrer' href='https://contact.mcphail.dev/'>McPhail.dev</a>&#169; {new Date().getFullYear()}
  //     </footer>
  //     <ToTopButton onClick={() => scrollToTop()} id='toTop'>
  //       Back to Top
  //       {/* <ToTopIcon /> */}
  //     </ToTopButton>
  //   </LayoutWrapper>
  // )
  return (
    <LayoutWrapper>
      <Header
        siteTitle={site.title}
        categories={categories}
        socials={socials}
        fontColor={site.fontColor}
      />
      <main>
        {children}
      </main>
      {/* <footer>
        <h3>Footer</h3>
      </footer> */}
    </LayoutWrapper>
  )
}

export default Layout
