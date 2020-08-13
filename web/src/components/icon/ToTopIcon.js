import React from 'react'
import styled from 'styled-components'

const IconSvg = styled.svg`
  fill: ${(props) => props.theme.fontColor};
`
const ToTopIcon = () => {
  return (
    <IconSvg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='24px'
      height='24px'
    />
  )
}

export default ToTopIcon
