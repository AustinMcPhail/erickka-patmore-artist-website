import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const PaginationStyles = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  justify-items: center;
  align-items: center;
  position: relative;

  .nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    column-gap: 2rem;

    a {
      &[aria-current],
      &.current {
        font-weight: bold;
      }
    }
  }
`

const Pagination = ({ pageSize, totalCount, currentPage, skip, baseUrl }) => {
  const totalPages = Math.ceil(totalCount / pageSize)
  const prevPage = currentPage - 1
  const nextPage = currentPage + 1
  const hasNextPage = nextPage < totalPages
  const hasPrevPage = currentPage >= 1

  return (
    <PaginationStyles>
      <div className="read">
        {hasPrevPage && (
          <Link to={`${baseUrl}/${prevPage || ''}`}>
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span>Prev</span>
          </Link>
        )}
      </div>
      <div className="nav">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            className={currentPage === 0 && i === 0 ? 'btn current' : 'btn'}
            to={`${baseUrl}/${i || ''}`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
      <div className="read">
        {hasNextPage && (
          <Link to={`${baseUrl}/${nextPage}`}>
            <span>Next</span>
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        )}
      </div>
    </PaginationStyles>
  )
}

export default Pagination
