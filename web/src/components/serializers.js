import React from 'react'
import Figure from './Figure'

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
    portfolioImage: Figure,
  },
}

export default serializers
