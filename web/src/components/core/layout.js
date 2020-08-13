import React from 'react'
import Header from './header'
import styled, {keyframes} from 'styled-components'
import ToTopIcon from '../icon/ToTopIcon'

const LayoutWrapper = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;

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
  z-index: 5;
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

  margin-right: 2rem;
  margin-bottom: 1rem;

  font-weight: thin;
  @media (min-width: 768px) {
    margin-right: 10rem;
  }
`

const Layout = ({
  children,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
  categories,
  socials,
  fontColor
}) => {
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
  window.addEventListener('scroll', handleScrolling)

  return (
    <LayoutWrapper>
      <Header
        siteTitle={siteTitle}
        onHideNav={onHideNav}
        onShowNav={onShowNav}
        showNav={showNav}
        categories={categories}
        socials={socials}
        fontColor={fontColor}
      />
      <ToTopButton onClick={() => scrollToTop()} id='toTop'>
        Back to Top
        {/* <ToTopIcon /> */}
      </ToTopButton>
      <main>{children}</main>
    </LayoutWrapper>
  )
}

export default Layout
