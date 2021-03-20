import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ShareIcon from './icon/ShareIcon'

const NativeShareStyles = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  position: relative;
  transition: opacity 150ms ease-in-out;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;

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
`
const FallbackShareStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    margin-bottom: 1rem;
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
        &:after {
          opacity: 0.75;
          width: 50%;
        }
      }
      &:active {
        &:after {
          width: 100%;
        }
      }
    }
  }
`

const Share = ({ title }) => {
  const [showNativeShare, setShowNativeShare] = useState(false)
  useEffect(() => {
    if (navigator && navigator.share) setShowNativeShare(true)
  }, [])
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const shareClicked = () => {
    if (navigator.share) {
      navigator.share({
        title,
        url,
      })
    }
  }

  return showNativeShare ? (
    <NativeShareStyles type="button" onClick={shareClicked}>
      <ShareIcon />
      <span>Share</span>
    </NativeShareStyles>
  ) : (
    <FallbackShareStyles>
      <a
        href={`https://twitter.com/intent/tweet/?url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
          <path d="M24,4.3c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2C19.3,2.6,18,2,16.6,2 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,7.8,4.1,5.9,1.7,2.9C1.2,3.6,1,4.5,1,5.4c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.4,1.6,9.2,1,8.9c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.2,23.3,5.3,24,4.3" />
        </svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
          <path d="M 21.800781 0 L 2.199219 0 C 1 0 0 1 0 2.199219 L 0 21.800781 C 0 23 1 24 2.199219 24 L 12 24 L 12 14 L 9 14 L 9 11 L 12 11 L 12 8 C 12 5.5 13 4 16 4 L 19 4 L 19 7 L 17.699219 7 C 16.800781 7 16 7.800781 16 8.699219 L 16 11 L 20 11 L 19.5 14 L 16 14 L 16 24 L 21.800781 24 C 23 24 24 23 24 21.800781 L 24 2.199219 C 24 1 23 0 21.800781 0 Z" />
        </svg>
      </a>
      <span>Share</span>
    </FallbackShareStyles>
  )
}

export default Share
