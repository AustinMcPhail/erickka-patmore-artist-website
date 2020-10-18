import React from 'react'

export const JournalPost = ({prev, post, next}) => {
  return (
    <div>
      {prev && <p>Previous: {prev.title}</p>}
      <p>Current: {post.title}</p>
      {next && <p>Next: {next.title}</p>}
    </div>
  )
}
