import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const PaginationStyles = styled.div`
  /* display: grid;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  justify-items: center;
  align-items: center;
  position: relative; */

  display: flex;
  justify-content: space-between;
  gap: var(--content-spacing);

  div {
    max-width: 50%;
  }

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

const Pagination = ({
  pageSize,
  totalCount,
  currentPage,
  baseUrl,
  prevUrl,
  nextUrl,
  prevText,
  nextText,
}) => {
  let totalPages
  let prevPage
  let nextPage
  let hasNextPage
  let hasPrevPage
  if (!Number.isNaN(totalCount) && !Number.isNaN(currentPage)) {
    totalPages = Math.ceil(totalCount / pageSize)
    prevPage = currentPage - 1
    nextPage = currentPage + 1
    hasNextPage = nextPage < totalPages
    hasPrevPage = currentPage >= 1
  }

  return (
    <PaginationStyles>
      <div>
        {(hasPrevPage || prevUrl) && (
          <Link className="btn" to={`${baseUrl}/${prevPage || prevUrl || ''}`}>
            <span>&larr; {prevText || 'Prev'}</span>
          </Link>
        )}
      </div>
      <div className="nav">
        {!Number.isNaN(totalPages) &&
          !Number.isNaN(currentPage) &&
          Array.from({ length: totalPages }).map((_, i) => (
            <Link
              className={currentPage === 0 && i === 0 ? 'btn current' : 'btn'}
              to={`${baseUrl}/${i || ''}`}
            >
              {i + 1}
            </Link>
          ))}
      </div>
      <div>
        {(hasNextPage || nextUrl) && (
          <Link className="btn" to={`${baseUrl}/${nextPage || nextUrl}`}>
            <span>{nextText || 'Next'} &rarr;</span>
          </Link>
        )}
      </div>
    </PaginationStyles>
  )
}

export default Pagination
