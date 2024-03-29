import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Categories from '../Categories'
import FacebookIcon from '../icon/FacebookIcon'
import InstagramIcon from '../icon/InstagramIcon'
import Nav from './nav'

const HeaderWrapper = styled.header`
  margin-top: clamp(1rem, 1vw, 2rem);
  margin-bottom: clamp(1rem, 1vw, 2rem);
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

const Header = ({ title, socials, cvUrl, storeUrl, blurBackground }) => {
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
        <Nav blurBackground={blurBackground} cvUrl={cvUrl} storeUrl={storeUrl}>
          <Categories />
        </Nav>
      </div>
    </HeaderWrapper>
  )
}

export default Header
