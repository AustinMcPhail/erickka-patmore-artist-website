import { Link } from 'gatsby'
import React, { useState } from 'react'
import styled from 'styled-components'

const NavStyles = styled.nav`
  width: 100%;

  @media (max-width: 1024px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .mobile {
    transition: all;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    @media (min-width: 1024px) {
      display: none;
      flex-direction: column;
    }

    z-index: 1;

    @keyframes slideRight {
      0% {
        transform: translateX(0);
      }
      5% {
        transform: translateX(-5%);
      }
      100% {
        transform: translateX(100vw);
      }
    }
    background: pink;
    &.open {
      display: block;
    }
    &.opening {
      display: block;
      pointer-events: none;
      --anim: slideRight 150ms ease-in-out reverse;
    }
    &.closing {
      display: block;
      pointer-events: none;
      --anim: slideRight 150ms ease-in-out forwards;
    }
    &.closed {
      display: none;
    }
    animation: var(--anim);
    .nav {
      max-width: 50vw;
      align-items: flex-end;
      padding-left: calc(2 * var(--content-spacing));
      padding-right: calc(2 * var(--content-spacing));
    }
  }

  button.menu-toggle {
    display: none;
    @media (max-width: 1024px) {
      display: inline-block;
    }
  }

  ul {
    padding-bottom: 1rem;
    &.nav {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--content-spacing);
      margin-top: clamp(0.5rem, 2vw, 2rem);
    }

    li {
      text-align: center;
      @media (min-width: 1024px) {
        text-align: left;
      }
    }

    &.main-nav {
      @media (max-width: 1024px) {
        display: none;
      }
    }
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`

const Nav = ({ children }) => {
  const [menuState, setMenuState] = useState('closed')

  function toggleMenu() {
    switch (menuState) {
      case 'open':
        setMenuState('closing')
        setTimeout(() => {
          setMenuState('closed')
        }, 150)
        break
      case 'closed':
        setMenuState('opening')
        setTimeout(() => {
          setMenuState('open')
        }, 150)
        break
      default:
        setMenuState('open')
    }
  }

  return (
    <NavStyles>
      <button className="menu-toggle" type="button" onClick={() => toggleMenu()}>
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
        </svg>
      </button>
      <div className={`mobile ${menuState}`}>
        <button type="button" onClick={() => toggleMenu()}>
          {menuState === 'closed' ? 'Open' : 'Close'}
        </button>
        <ul className="nav">
          <li>
            <Link className="btn" to="/journal" partiallyActive activeClassName="active">
              Journal
            </Link>
          </li>
          <li>
            <Link className="btn" to="/about" activeClassName="active">
              About
            </Link>
          </li>
          {children}
        </ul>
      </div>
      <ul className="main-nav nav">
        <li>
          <Link className="btn" to="/journal" partiallyActive activeClassName="active">
            Journal
          </Link>
        </li>
        <li>
          <Link className="btn" to="/about" activeClassName="active">
            About
          </Link>
        </li>
        {children}
      </ul>
    </NavStyles>
  )
}

export default Nav
