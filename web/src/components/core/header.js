import {Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '../icon/facebookIcon'
import TwitterIcon from '../icon/twitterIcon'
import InstagramIcon from '../icon/instagramIcon'

const HeaderWrapper = styled.header`
  top: 0;
  /* position: sticky; */
  display: grid;
  grid-template-columns: 1fr 3fr;
  z-index: 1;
`

const Navigation = styled.nav``

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-left: 2em;
  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: 0 0px 5px 10px ${(props) => props.theme.backgroundColor};
`
const NavListItem = styled.li`
  padding: auto;
  margin-left: 4em;
  text-align: center;
`

const Brand = styled.div`
  padding-top: 5em;
  padding-bottom: 1.5em;
  text-align: center;
  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: 0 0px 5px 10px ${(props) => props.theme.backgroundColor};
  border-bottom-right-radius: 100px;
`

const BrandLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1em;

  * {
    margin-left: 10px;
    margin-right: 10px;
  }
`
const ArtCategoriesNavItem = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const Header = ({onHideNav, onShowNav, showNav, siteTitle, categories}) => {
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
          <InstagramIcon />
          <FacebookIcon />
          <TwitterIcon />
        </BrandLinks>
      </Brand>
      <Navigation>
        <NavList>
          <ArtCategoriesNavItem>
            <NavListItem>Art</NavListItem>
            <ul style={{display: 'flex', position: 'fixed'}}>
              {categories.map((cat) => (
                <Link to={'art/' + cat.slug.current}>
                  <li style={{marginRight: '1em'}}>{cat.title}</li>
                </Link>
              ))}
            </ul>
          </ArtCategoriesNavItem>
          <Link to='/reach-out'>
            <NavListItem>Reach Out</NavListItem>
          </Link>
          <Link to='/journal'>
            <NavListItem>Journal</NavListItem>
          </Link>
          <Link to='/statement'>
            <NavListItem>Statement</NavListItem>
          </Link>
          <Link to='/cv'>
            <NavListItem>CV</NavListItem>
          </Link>
        </NavList>
      </Navigation>
    </HeaderWrapper>
  )
}

export default Header
