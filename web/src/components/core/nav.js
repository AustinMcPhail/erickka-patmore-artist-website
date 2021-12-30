import { Link } from 'gatsby'
import React, { useEffect, useRef, useState } from 'react'
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

    -webkit-box-shadow: 0px 0px 0px 4px #eaeaeb, 0px 0px 0px 8px #828089, 0px 0px 0px 12px #595562,
      5px 5px 15px 5px rgba(0, 0, 0, 0);
    box-shadow: 0px 0px 0px 4px #eaeaeb, 0px 0px 0px 8px #828089, 0px 0px 0px 12px #595562,
      5px 5px 15px 5px rgba(0, 0, 0, 0);

    background: #fefbff;

    padding: var(--content-spacing);

    &.open {
      display: block;
    }
    &.opening {
      display: block;
      pointer-events: none;
      --anim: slideRight 250ms ease-in-out reverse;
    }
    &.closing {
      display: block;
      pointer-events: none;
      --anim: slideRight 250ms ease-in-out forwards;
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
      text-align: right;
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

const Nav = ({ children, cvUrl, storeUrl, blurBackground }) => {
  const [menuState, setMenuState] = useState('closed')

  const navBox = useRef()

  function toggleMenu() {
    switch (menuState) {
      case 'open':
        setMenuState('closing')
        setTimeout(() => {
          setMenuState('closed')
          blurBackground(false)
        }, 250)
        break
      case 'closed':
        setMenuState('opening')
        setTimeout(() => {
          setMenuState('open')
          blurBackground(true)
        }, 250)
        break
      default:
        setMenuState('open')
        blurBackground(true)
    }
  }

  useEffect(() => {
    function handleClick(event) {
      if (
        menuState === 'open' &&
        navBox &&
        navBox.current &&
        !navBox.current.contains(event.target)
      ) {
        event.preventDefault()
        event.stopPropagation()
        setMenuState('closing')
        setTimeout(() => {
          setMenuState('closed')
          blurBackground(false)
        }, 250)
      }
    }

    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [menuState, blurBackground])
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
      <div className={`mobile ${menuState}`} ref={navBox}>
        <button type="button" onClick={() => toggleMenu()}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
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
          <li>
            <Link className="btn" to={storeUrl} target="_blank">
              Store
            </Link>
          </li>
          {/* <li>
            <Link className="btn" to="/instagram" activeClassName="active">
              Instagram
            </Link>
          </li> */}
          {cvUrl && (
            <li>
              <a
                className="btn"
                style={{ display: 'flex', alignItems: 'center' }}
                href={`${cvUrl}?dl=`}
              >
                CV
                <svg
                  style={{ width: '1rem' }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </a>
            </li>
          )}
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
        <li>
          <Link className="btn" target="_blank" to={storeUrl}>
            Store
          </Link>
        </li>
        {/* <li>
          <Link className="btn" to="/instagram" activeClassName="active">ß
            Instagram
          </Link>
        </li> */}
        {cvUrl && (
          <li>
            <a
              className="btn"
              style={{ display: 'flex', alignItems: 'center' }}
              href={`${cvUrl}?dl=`}
            >
              CV
              <svg
                style={{ width: '1rem' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </li>
        )}
        {children}
      </ul>
    </NavStyles>
  )
}

export default Nav
