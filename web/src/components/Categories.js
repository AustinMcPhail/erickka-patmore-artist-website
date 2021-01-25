import React from 'react'
import {graphql, Link, useStaticQuery} from 'gatsby'
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
        a{
            position: relative;
            transition: opacity 150ms ease-in-out;
            padding-bottom: .5rem;
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
                &:hover, &:focus {
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
    }
}
`

const Categories = () => {
  const {
    allSanityCategory: {edges: categories}
  } = useStaticQuery(graphql`
        query {
      allSanityCategory(filter: {slug: {current: {ne: null}}, enabled: {ne: false}}) {
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
        {categories && categories.map(({node: c}) =>
          <li key={c.slug.current}>
            <Link to={'/gallery/' + c.slug.current} activeClassName='active'>
              {c.title}
            </Link>
          </li>
        )}
      </ul>
    </CategoriesStyles>
  )
}

export default Categories
