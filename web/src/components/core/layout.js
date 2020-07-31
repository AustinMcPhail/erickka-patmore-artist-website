import React from 'react'
import Header from './header'
import styled from 'styled-components'

const LayoutWrapper = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;

  @media (min-width: 768px) {
    margin-left: 5rem;
    margin-right: 5rem;
  }
`

const Layout = ({children, onHideNav, onShowNav, showNav, siteTitle}) => (
  <LayoutWrapper>
    <Header siteTitle={siteTitle} onHideNav={onHideNav} onShowNav={onShowNav} showNav={showNav} />
    <main>{children}</main>
    {/* <footer>
      <div>
        <div>
          &copy; {new Date().getFullYear()}, Built with <a href='https://www.sanity.io'>Sanity</a>{' '}
          &amp;
          {` `}
          <a href='https://www.gatsbyjs.org'>Gatsby</a>
        </div>
      </div>
    </footer> */}
  </LayoutWrapper>
)

export default Layout
