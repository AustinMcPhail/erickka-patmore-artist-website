import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Categories from '../Categories'
import FacebookIcon from '../icon/FacebookIcon'
import InstagramIcon from '../icon/InstagramIcon'
import Nav from './nav'

const HeaderWrapper = styled.header`
  margin-top: clamp(1rem, 1vw, 2rem);
  .main {
    display: flex;
    @media (min-width: 1024px) {
      flex-direction: column;
    }

    gap: 1rem;
  }
  .social {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .categories {
    margin-top: clamp(0.5rem, 2vw, 2rem);
    width: 100%;
  }
`

const Header = ({ title, socials }) => {
  const inGallery = typeof window !== 'undefined' ? window.location.href.includes('gallery') : ''
  return (
    <HeaderWrapper>
      <div className="main">
        <h1>
          <Link to="/">{title && title.split(' ').map((s) => <p key={s}>{s}</p>)}</Link>
          <ul className="social" aria-label="Social Links">
            <li aria-label="Instagram">
              {socials && socials.instagramUrl && <InstagramIcon url={socials.instagramUrl} />}
            </li>
            <li aria-label="Facebook">
              {socials && socials.facebookUrl && <FacebookIcon url={socials.facebookUrl} />}
            </li>
          </ul>
        </h1>
        <Nav />
      </div>
      <div className="categories">
        <Categories />
      </div>
    </HeaderWrapper>
  )
}

export default Header
