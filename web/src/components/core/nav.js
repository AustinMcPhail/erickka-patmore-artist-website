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
    }
  }
`

const Nav = () => (
  <NavStyles>
    <ul className="main-nav">
      <li>
        <Link className="btn" to="/journal" activeClassName="active">
          Journal
        </Link>
      </li>
      <li>
        <Link className="btn" to="/about" activeClassName="active">
          About
        </Link>
      </li>
    </ul>
  </NavStyles>
)

export default Nav
