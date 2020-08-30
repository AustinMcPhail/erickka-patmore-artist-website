import {Link} from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '../icon/FacebookIcon'
import InstagramIcon from '../icon/InstagramIcon'

const Brand = styled.div`
  padding-top: 1em;
  text-align: left;
  border-bottom-right-radius: 100px;
`

const BrandLinks = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1em;

  a {
    margin-right: 0.75em;
    transition: transform 0.25s ease-in-out;

    :hover, :focus {
      transform: rotate(5deg) scale(1.05)
    }
  }
`
const NewHeaderWrapper = styled.header`
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 3fr;

    .brand {
    }

    .nav {
      .nav-list {
        padding-top: 1rem;
        display: flex;
        justify-content: space-between;

        @media (max-width: 1024px) {
          flex-direction: column-reverse;
          margin-bottom: 1rem;
        }
        
        .nav-list-item {
          position: relative;
          width: 100%;
          margin: unset 1rem unset 1rem;
          text-align: center;
          @media (max-width: 1024px) {
              text-align: right;
              margin:  0.5rem unset 0.5rem unset;
              padding-top: 1rem;
              padding-bottom: 1rem;
          }

          &.nav-list-dropdown {
            .dropdown-content {
              margin-top: 0.5rem;
              display: none;
              .nav-link.dropdown-item {
                margin-top: 0.25rem;
                border-bottom: 2px solid hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 + '%'}, 1);
                transition: border-bottom 0.25s ease-in-out;
                &:hover, :focus {
                  border-bottom: 2px solid ${(props) => props.theme.fontColor};
                }
              }
            }

            &:hover, :focus-within {
              .dropdown-content {
                display: flex;
                flex-direction: column;
              }
            }

          }

          .nav-link {
            @media (max-width: 1024px) {
              margin-right: 1rem;
            }

            &:not(.dropdown-item)::after {
              content: ' ';
              position: absolute;
              top: -1rem;
              left: 0;
              width: 100%;
              border-top: 4px solid ${(props) => props.theme.fontColor};
              @media (max-width: 1024px) {
                width: unset;
                border-top: unset;
                top: 0;
                left: unset;
                right: 0;
                height: 100%;
                border-right: 4px solid ${(props) => props.theme.fontColor};
              }
              opacity: 0.75;
              transition: clip-path 0.2s ease-in-out;
              clip-path: circle(0%);
            }

            &:not(.dropdown-item)::before {
              content: ' ';
              position: absolute;
              width: 100%;
              height: 4rem;
              top: -1rem;
              left: 0;
              z-index: -1;
              transition: box-shadow 0.21s ease-in-out;
              box-shadow: inset 0 0 5px -5px hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 * 0.5 + '%'}, 0);

              @media (max-width: 1024px) {
                width: unset;
                height: 100%;
                top: 0;
                right: 0;
                left: unset;
                box-shadow: inset 0 0 5px -5px hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 * 0.5 + '%'}, 0);
              }
            }
            &:hover:not(.active), :focus:not(.active) {
              &::after {
                clip-path: circle(100%);
                @media (max-width: 1024px) {
                  clip-path: circle(50%);
                }
              }
              &::before {
                box-shadow: inset 0 -20px 10px -5px hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 + '%'}, 1), inset 0 10px 20px -5px hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 * 0.5 + '%'}, 1);
              }
            }
          }
          
          .active {
            &:not(.dropdown-item)::after {
              clip-path: circle(100%);
            }
            &:not(.dropdown-item)::before {
              box-shadow: inset 0 -20px 10px -5px hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 + '%'}, 1), inset 0 10px 20px -5px hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 * 0.5 + '%'}, 1);
            }
          }
        }
      }
    }
  `

const reachOutPath = '/reach-out'
const cvPath = '/cv'
const statementPath = '/statement'
const portfolioPath = '/portfolio'

const Header = ({siteTitle, categories, socials, fontColor}) => {
  return (
    <NewHeaderWrapper>
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
      <nav className='nav'>
        <ul className='nav-list'>
          <li className='nav-list-item nav-list-dropdown'>
            <Link className='nav-link' activeClassName='active' to={portfolioPath} partiallyActive>
              Portfolio
            </Link>
            <div className='dropdown-content'>
              {categories.map((cat, i) => (
                <Link className='nav-link dropdown-item' activeClassName='active' to={'/portfolio/' + cat.slug.current} key={'category.' + cat.slug.current}>
                  {cat.title}
                </Link>
              ))}
            </div>
          </li>
          <li className='nav-list-item'>
            <Link className='nav-link' activeClassName='active' to={statementPath}>
              Statement
            </Link>
          </li>
          <li className='nav-list-item'>
            <Link className='nav-link' activeClassName='active' to={reachOutPath}>
              Reach Out
            </Link>
          </li>
          <li className='nav-list-item'>
            <Link className='nav-link' activeClassName='active' to={cvPath}>
              CV
            </Link>
          </li>
        </ul>
      </nav>
    </NewHeaderWrapper>
  )
}

export default Header
