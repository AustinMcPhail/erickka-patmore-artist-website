import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const CategoriesStyles = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    @media (min-width: 1024px) {
      flex-direction: column;
    }
    gap: clamp(1rem, 1vw, 1rem);
    padding-bottom: 1rem;
    li {
      text-align: start;
    }
  }
`

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
    <CategoriesStyles>
      <ul>
        {categories &&
          categories.map(({ node: c }) => (
            <li key={c.slug.current}>
              <Link className="btn" to={`/gallery/${c.slug.current}`} activeClassName="active">
                {c.title}
              </Link>
            </li>
          ))}
      </ul>
    </CategoriesStyles>
  )
}

export default Categories
