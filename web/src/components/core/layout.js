import React, {useEffect} from 'react'
import Header from './header'
import styled, {keyframes} from 'styled-components'
import SEO from './seo'

const LayoutWrapper = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
  margin-block-end: 4rem;

  @media (min-width: 768px) {
    margin-left: 10rem;
    margin-right: 10rem;
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0.0;
    transform: scale(0);
  }

  to {
    opacity: 0.5;
    transform: scale(1);
  }
`

const fadeOut = keyframes`
  from {
    opacity: 0.5;
    transform: scale(1);
  }

  to {
    opacity: 0.0;
    transform: scale(0);
  }
`

const ToTopButton = styled.button`
  cursor: pointer;
  position: fixed;
  bottom: 0;
  right: 0;
  opacity: 0;
  transform: scale(0);
  &.hideToTop {
    animation: ${fadeOut} 0.5s ease-in-out forwards;
  }
  &.showToTop {
    animation: ${fadeIn} 0.5s ease-in-out forwards;
  }

  margin-right: 0rem;
  margin-bottom: 1rem;

  font-weight: thin;
  @media (min-width: 768px) {
    margin-right: 5rem;
  }
`

const Layout = ({children, site, categories, socials}) => {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
  const handleScrolling = () => {
    const toTopButton = document.getElementById('toTop')
    if (window.scrollY > 50) {
      toTopButton.classList.remove('hideToTop')
      toTopButton.classList.add('showToTop')
    } else if (toTopButton.classList.contains('showToTop') && window.scrollY <= 50) {
      toTopButton.classList.remove('showToTop')
      toTopButton.classList.add('hideToTop')
    }
  }
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('scroll', handleScrolling)
  })

  return (
    <LayoutWrapper>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Header
        siteTitle={site.title}
        categories={categories}
        socials={socials}
        fontColor={site.fontColor}
      />
      <main>{children}</main>
      <ToTopButton onClick={() => scrollToTop()} id='toTop'>
        Back to Top
        {/* <ToTopIcon /> */}
      </ToTopButton>
    </LayoutWrapper>
  )
}

export default Layout
