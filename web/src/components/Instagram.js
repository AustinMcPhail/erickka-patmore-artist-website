import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const url = `/.netlify/functions/instagram`

const InstagramPosts = styled.div`
  grid-area: i;
  padding: 2rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  a {
    img {
      max-width: 100%;
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
              <img src={post.thumbnail} alt={post.caption} />
            </a>
          )
        })}
    </InstagramPosts>
  )
}

export default Instagram
