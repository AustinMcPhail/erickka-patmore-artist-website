import {Link} from 'gatsby'
import React, {useState} from 'react'
import styled, {keyframes} from 'styled-components'
import FacebookIcon from '../icon/FacebookIcon'
import TwitterIcon from '../icon/TwitterIcon'
import InstagramIcon from '../icon/InstagramIcon'

const HeaderWrapper = styled.header`
  top: 0;
  /* position: sticky; */
  display: grid;
  grid-template-columns: 1fr 3fr;
  z-index: 1;
  margin-bottom: 1em;

  background-color: ${(props) => props.theme.headerBackgroundColor};
  box-shadow: 0 0px 10px 10px ${(props) => props.theme.headerBackgroundColor};
`

const Navigation = styled.nav`
  /* padding-top: 15px; */
`

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 2em;
  font-family: 'Cutive Mono', monospace;
`
const NavListItem = styled.li`
  margin-left: 1em;
  margin-right: 1em;
  padding-bottom: 0.5em;
`

const Brand = styled.div`
  text-align: left;
  border-bottom-right-radius: 100px;
`

const zoomTilt = keyframes`
  from {
    transform: rotate(0deg) scale(1);
  }

  to {
    transform: rotate(5deg) scale(1.05);
  }
`

const BrandLinks = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;

  a {
    margin-right: 0.75em;
    &:hover {
      animation: ${zoomTilt} 0.25s linear forwards;
    }
  }
`

const reachOutPath = '/reach-out'
const cvPath = '/cv'
const statementPath = '/statement'
const portfolioPath = '/portfolio'
const journalPath = '/journal'

const inactiveStyle = {
  borderTop: 'solid 4px transparent',
  paddingTop: '0.5em'
}

const subInactiveStyle = {
  borderTop: 'solid 2px transparent'
}

const Header = ({onHideNav, onShowNav, showNav, siteTitle, categories, socials, fontColor}) => {
  const [portfolioListOpen, setPortfolioListOpen] = useState(
    window.location.href.includes('/portfolio/')
  )

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
          {siteTitle.split(' ').map((substr, i) => (
            <h1 key={'h1.' + i} style={{margin: 0}}>
              {substr}
            </h1>
          ))}
        </Link>
        <BrandLinks>
          {/* TODO: Add links to social media */}
          {socials && socials.instagramUrl && <InstagramIcon url={socials.instagramUrl} />}
          {socials && socials.facebookUrl && <FacebookIcon url={socials.facebookUrl} />}
          {socials && socials.twitterUrl && <TwitterIcon url={socials.twitterUrl} />}
        </BrandLinks>
      </Brand>
      <Navigation>
        <NavList>
          <div style={window.location.href.includes(portfolioPath) ? activeStyle : inactiveStyle}>
            <Link to={portfolioPath} onMouseEnter={() => setPortfolioListOpen(true)}>
              <NavListItem>Portfolio</NavListItem>
            </Link>
            {portfolioListOpen && (
              <ul
                style={{display: 'flex', position: 'absolute', padding: '15px'}}
                onMouseLeave={() => setPortfolioListOpen(false)}
              >
                {categories.map((cat, i) => (
                  <Link
                    key={'category.' + cat.slug.current}
                    to={'/portfolio/' + cat.slug.current}
                    activeStyle={subActiveStyle}
                    style={{marginRight: '1em', paddingBottom: '.5em', ...subInactiveStyle}}
                  >
                    <li>{cat.title}</li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
          <Link to={reachOutPath} activeStyle={activeStyle} style={inactiveStyle} partiallyActive>
            <NavListItem>Reach Out</NavListItem>
          </Link>
          <Link to={journalPath} activeStyle={activeStyle} style={inactiveStyle} partiallyActive>
            <NavListItem>Journal</NavListItem>
          </Link>
          <Link to={statementPath} activeStyle={activeStyle} style={inactiveStyle} partiallyActive>
            <NavListItem>Statement</NavListItem>
          </Link>
          <Link to={cvPath} activeStyle={activeStyle} style={inactiveStyle} partiallyActive>
            <NavListItem>CV</NavListItem>
          </Link>
        </NavList>
      </Navigation>
    </HeaderWrapper>
  )
}

export default Header
