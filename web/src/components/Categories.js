import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'

const Categories = () => {
  const {
    allSanityCategory: { edges: categories },
  } = useStaticQuery(graphql`
    query {
      allSanityCategory(filter: { slug: { current: { ne: null } }, enabled: { ne: false } }) {
        edges {
          node {
            title
            slug {
              current
            }
          }
        }
      }
    }
  `)

  return (
    <>
      {categories &&
        categories.map(({ node: c }, i) => (
          <li key={c.slug.current} style={i === 0 ? { marginTop: 'clamp(0.5rem, 2vw, 2rem)' } : {}}>
            <Link className="btn" to={`/gallery/${c.slug.current}`} activeClassName="active">
              {c.title}
            </Link>
          </li>
        ))}
    </>
  )
}

export default Categories
