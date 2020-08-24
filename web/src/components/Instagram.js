import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const url = `/.netlify/functions/instagram`

const InstagramPosts = styled.div`
  display: flex;
  overflow: auto;
  padding-block-end: 1rem;
  a:not(:last-child) {
    margin-inline-end: 1rem;
  }

  a {
    img {
      box-shadow: 0px 10px 10px -10px rgba(0, 0, 0, 0.5);
    }
  }
`

const useInsta = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPosts(data))
  }, [])
  return posts
}

const Instagram = () => {
  const insta = useInsta()
  return (
    <InstagramPosts>
      {insta.length > 0 &&
        insta.map((post) => {
          return (
            <a key={post.id} href={post.url} target='_blank' rel='noopener noreferrer'>
              <img
                src={`https://images.weserv.nl/?url=${encodeURIComponent(post.thumbnail)}&w=230`}
                alt={post.caption}
              />
            </a>
          )
        })}
    </InstagramPosts>
  )
}

export default Instagram
