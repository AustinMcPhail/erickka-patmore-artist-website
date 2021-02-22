import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const NavStyles = styled.nav`
  width: 100%;
  ul {
    &.main-nav {
      margin-top: 5px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      @media (min-width: 1024px) {
        display: flex;
        flex-direction: column;
      }
    }

    gap: var(--content-spacing);
    padding-bottom: 1rem;
    li {
      text-align: center;
      @media (min-width: 1024px) {
        text-align: left;
      }
      a {
        position: relative;
        transition: opacity 150ms ease-in-out;
        padding-bottom: 0.5rem;
        &.active {
          border-bottom: solid 2px black;
        }
        &:after {
          transition: width 150ms ease-in-out;
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          border-bottom: solid 2px black;
          width: 0%;
        }
        &:not(.active) {
          &:hover,
          &:focus {
            opacity: 0.75;
            /* border-bottom: solid 1px black; */
            &:after {
              opacity: 0.75;
              width: 50%;
            }
          }
          &:active {
            /* border-bottom: solid 1px black; */
            &:after {
              width: 100%;
            }
          }
        }
      }
    }
  }
`

const Nav = () => (
  <NavStyles>
    <ul className="main-nav">
      <li>
        <Link to="/journal" activeClassName="active">
          Journal
        </Link>
      </li>
      <li>
        <Link to="/about" activeClassName="active">
          About
        </Link>
      </li>
    </ul>
  </NavStyles>
)

export default Nav
