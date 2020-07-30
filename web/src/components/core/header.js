import {Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '../icon/facebookIcon'
import TwitterIcon from '../icon/twitterIcon'
import InstagramIcon from '../icon/instagramIcon'

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
`

const Brand = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;
`
const Navigation = styled.nav`
  width: 100%;
`

const NavList = styled.ul`
  display: flex;
  justify-content: space-evenly;
`
const NavListItem = styled.li`
  padding: 1rem;
  text-align: center;
`

const BrandLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  * {
    margin-left: 10px;
    margin-right: 10px;
  }
`

const Header = ({onHideNav, onShowNav, showNav, siteTitle}) => {
  return (
    <HeaderWrapper>
      <Brand>
        <Link to='/'>
          {siteTitle.split(' ').map((substr, i) => <h1 key={'h1.' + i} style={{margin: 0}}>{substr}</h1>)}
        </Link>
        <BrandLinks>
          {/* TODO: Add links to social media */}
          <InstagramIcon />
          <FacebookIcon />
          <TwitterIcon />
        </BrandLinks>
      </Brand>
      <Navigation>
        <NavList>
          <Link to='/art'>
            <NavListItem>
              Art
            </NavListItem>
          </Link>
          <Link to='/reach-out'>
            <NavListItem>
              Reach Out
            </NavListItem>
          </Link>
          <Link to='/journal'>
            <NavListItem>
              Journal
            </NavListItem>
          </Link>
          <Link to='/statement'>
            <NavListItem>
              Statement
            </NavListItem>
          </Link>
          <Link to='/cv'>
            <NavListItem>
              CV
            </NavListItem>
          </Link>
        </NavList>
      </Navigation>
    </HeaderWrapper>
  )
}

export default Header
