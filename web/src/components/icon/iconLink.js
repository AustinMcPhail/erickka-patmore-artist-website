import React from 'react'

const IconLink = ({icon, url}) => {
  return (
    <a href={url} target='_blank' rel='noopener noreferrer'>
      <img src={icon} />
    </a>
  )
}

export default IconLink
