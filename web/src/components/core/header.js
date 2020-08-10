import {Link} from 'gatsby'
import React, {useState} from 'react'
import styled from 'styled-components'
import FacebookIcon from '../icon/facebookIcon'
import TwitterIcon from '../icon/twitterIcon'
import InstagramIcon from '../icon/instagramIcon'

const HeaderWrapper = styled.header`
  top: 0;
  position: sticky;
  display: grid;
  grid-template-columns: 1fr 3fr;
  z-index: 1;
  margin-bottom: 1em;

  background-color: ${(props) => props.theme.backgroundColor};
  box-shadow: 0 0px 5px 10px ${(props) => props.theme.backgroundColor};
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
`
const NavListItem = styled.li`
  /* padding: auto; */
  margin-left: 1em;
  margin-right: 1em;
  /* margin-right: auto; */
  /* text-align: center; */
`

const Brand = styled.div`
  text-align: left;
  border-bottom-right-radius: 100px;
`

const BrandLinks = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;

  * {
    margin-right: 0.75em;
  }
`
const ArtCategoriesNavItem = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const Header = ({onHideNav, onShowNav, showNav, siteTitle, categories}) => {
  const [artListOpen, setArtListOpen] = useState(window.location.href.includes('/portfolio/'))

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
          <Link
            to={'/portfolio'}
            activeStyle={{
              borderTop: 'solid 5px black'
            }}
            partiallyActive
            onMouseEnter={() => setArtListOpen(true)}
          >
            <NavListItem>Art</NavListItem>
            {artListOpen && (
              <ul
                style={{display: 'flex', position: 'absolute', padding: '15px'}}
                onMouseLeave={() => setArtListOpen(false)}
              >
                {categories.map((cat) => (
                  <Link
                    to={'/portfolio/' + cat.slug.current}
                    style={{
                      marginRight: '1em'
                    }}
                    activeStyle={{
                      borderTop: 'solid 2px black'
                    }}
                  >
                    <li>{cat.title}</li>
                  </Link>
                ))}
              </ul>
            )}
          </Link>
          <Link
            to={'/reach-out'}
            activeStyle={{
              borderTop: 'solid 5px black'
            }}
            partiallyActive
          >
            <NavListItem>Reach Out</NavListItem>
          </Link>
          <Link
            to='/journal'
            activeStyle={{
              borderTop: 'solid 5px black'
            }}
            partiallyActive
          >
            <NavListItem>Journal</NavListItem>
          </Link>
          <Link
            to='/statement'
            activeStyle={{
              borderTop: 'solid 5px black'
            }}
            partiallyActive
          >
            <NavListItem>Statement</NavListItem>
          </Link>
          <Link
            to='/cv'
            activeStyle={{
              borderTop: 'solid 5px black'
            }}
            partiallyActive
          >
            <NavListItem>CV</NavListItem>
          </Link>
        </NavList>
      </Navigation>
    </HeaderWrapper>
  )
}

export default Header
