import {Link} from 'gatsby'
import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import FacebookIcon from '../icon/FacebookIcon'
import InstagramIcon from '../icon/InstagramIcon'

const HeaderWrapper = styled.header`
  top: 0;
  display: grid;
  grid-template-columns: 1fr 3fr;
  z-index: 1;
  margin-bottom: 1em;
`

const NavList = styled.ul`
  display: flex;
  flex-direction: row;

  flex-direction: column-reverse;
  padding-left: 2em;

  flex-wrap: wrap;
  justify-content: space-between;
  font-family: ${(props) => props.theme.secondaryFont};

  text-align: end;

  @media (min-width: 1280px) {
    flex-direction: row;
    padding-left: 2em;
  }
`
const NavListItem = styled.li`
  padding-left: 1em;
  padding-bottom: 1em;
  @media (min-width: 1280px) {
    padding-right: 1em;
    padding-top: 1em;
  }
`

const Brand = styled.div`
  padding-top: 1em;
  text-align: left;
  border-bottom-right-radius: 100px;
`

const BrandLinks = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;

  @keyframes zoomTiltIn {
    from {
      transform: rotate(0deg) scale(1);
    }
    to {
      transform: rotate(5deg) scale(1.05);
    }
  }
  @keyframes zoomTiltOut {
    from {
      transform: rotate(5deg) scale(1.05);
    }
    to {
      transform: rotate(0deg) scale(1);
    }
  }

  a {
    margin-right: 0.75em;
    animation: zoomTiltOut 0.25s linear forwards;
    :hover {
      animation: zoomTiltIn 0.25s linear forwards;
    }
  }
`

const NavLinkList = styled.ul`
  left: 0;
  display: inline-flex;
  flex-direction: column;
  a {
    padding-left: 1em;
  }
  @media (min-width: 1280px) {
    padding-top: 1em;
    a {
      padding-right: 1em;
    }
    flex-direction: row;
    position: absolute;
  }
`

const PortfolioItem = styled.div`
  position: relative;
`

const reachOutPath = '/reach-out'
const cvPath = '/cv'
const statementPath = '/statement'
const portfolioPath = '/portfolio'
// const journalPath = '/journal'

const inactiveStyle = {
  borderTop: 'solid 4px transparent',
  paddingTop: '0.5em'
}

const subInactiveStyle = {
  borderTop: 'solid 2px transparent'
}

const Header = ({siteTitle, categories, socials, fontColor}) => {
  const [portfolioListOpen, setPortfolioListOpen] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') {
      setPortfolioListOpen(false)
    } else if (window.location.href.includes(portfolioPath)) {
      setPortfolioListOpen(true)
    }
  })

  const activeStyle = {
    borderTop: `solid 4px ${
      fontColor
        ? `rgba(${fontColor.rgb.r}, ${fontColor.rgb.g}, ${fontColor.rgb.b}, ${fontColor.rgb.a})`
        : '#2f2f2f'
    }`,
    paddingTop: '0.5em',
    fontWeight: 'bold',
    boxShadow: `inset 0 7px 9px -7px ${
      fontColor
        ? `rgba(${fontColor.rgb.r}, ${fontColor.rgb.g}, ${fontColor.rgb.b}, 0.4)`
        : '#2f2f2f'
    }`
  }

  const subActiveStyle = {
    borderTop: `solid 2px ${
      fontColor
        ? `rgba(${fontColor.rgb.r}, ${fontColor.rgb.g}, ${fontColor.rgb.b}, ${fontColor.rgb.a})`
        : '#2f2f2f'
    }`
  }

  return (
    <HeaderWrapper>
      <Brand>
        <Link to='/'>
          {siteTitle &&
            siteTitle.split(' ').map((substr, i) => (
              <h1 key={'h1.' + i} style={{margin: 0}}>
                {substr}
              </h1>
            ))}
        </Link>
        <BrandLinks>
          {socials && socials.instagramUrl && <InstagramIcon url={socials.instagramUrl} />}
          {socials && socials.facebookUrl && <FacebookIcon url={socials.facebookUrl} />}
        </BrandLinks>
      </Brand>
      <nav>
        <NavList>
          <PortfolioItem style={portfolioListOpen ? activeStyle : inactiveStyle}>
            <Link to={portfolioPath}>
              <NavListItem>Portfolio</NavListItem>
            </Link>
            {portfolioListOpen && (
              <NavLinkList>
                {categories.map((cat, i) => (
                  <Link
                    className={'test'}
                    key={'category.' + cat.slug.current}
                    to={'/portfolio/' + cat.slug.current}
                    activeStyle={subActiveStyle}
                    style={{paddingBottom: '.5em', ...subInactiveStyle}}
                  >
                    <li>{cat.title}</li>
                  </Link>
                ))}
              </NavLinkList>
            )}
          </PortfolioItem>
          <Link to={reachOutPath} activeStyle={activeStyle} style={inactiveStyle} partiallyActive>
            <NavListItem>Reach Out</NavListItem>
          </Link>
          {/* <Link to={journalPath} activeStyle={activeStyle} style={inactiveStyle} partiallyActive>
            <NavListItem>Journal</NavListItem>
          </Link> */}
          <Link to={statementPath} activeStyle={activeStyle} style={inactiveStyle} partiallyActive>
            <NavListItem>Statement</NavListItem>
          </Link>
          <Link to={cvPath} activeStyle={activeStyle} style={inactiveStyle} partiallyActive>
            <NavListItem>CV</NavListItem>
          </Link>
        </NavList>
      </nav>
    </HeaderWrapper>
  )
}

export default Header
