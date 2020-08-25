import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

const url = `/.netlify/functions/instagram`

const InstagramPosts = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(8, 1fr);
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
  gap: 1rem;
  a {
    margin-bottom: 0;
    img {
      height: auto;
      width: 100%;
    }
  }

  a:nth-child(1) {
    img {
      animation: fadeIn 0.5s ease-in-out forwards;
    }
  }

  a:nth-child(2),
  a:nth-child(5) {
    img {
      animation: fadeIn 1s ease-in-out forwards;
    }
  }

  a:nth-child(3),
  a:nth-child(6),
  a:nth-child(9) {
    img {
      animation: fadeIn 1.5s ease-in-out forwards;
    }
  }

  a:nth-child(4),
  a:nth-child(7),
  a:nth-child(10),
  a:nth-child(13) {
    img {
      animation: fadeIn 2s ease-in-out forwards;
    }
  }

  a:nth-child(8),
  a:nth-child(11),
  a:nth-child(14) {
    img {
      animation: fadeIn 2.5s ease-in-out forwards;
    }
  }

  a:nth-child(12),
  a:nth-child(15) {
    img {
      animation: fadeIn 3s ease-in-out forwards;
    }
  }

  a:nth-child(16) {
    img {
      animation: fadeIn 3.5s ease-in-out forwards;
    }
  }

  @keyframes fadeIn {
    0% {
      transform: translateY(-10px);
      opacity: 0;
      box-shadow: 0px 10px 20px 5px
        hsl(
          ${(props) => props.theme.backgroundHsl.h},
          ${(props) =>
    props.theme.backgroundHsl.s * 100 - props.theme.backgroundHsl.s * 100 * 0.5 + '%'},
          ${(props) =>
    props.theme.backgroundHsl.l * 100 - props.theme.backgroundHsl.l * 100 * 0.5 + '%'}
        );
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
      box-shadow: 0px 15px 10px -10px hsl(${(props) => props.theme.backgroundHsl.h}, ${(props) => props.theme.backgroundHsl.s * 100 - props.theme.backgroundHsl.s * 100 * 0.5 + '%'}, ${(props) => props.theme.backgroundHsl.l * 100 - props.theme.backgroundHsl.l * 100 * 0.5 + '%'});
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
                src={`https://images.weserv.nl/?url=${encodeURIComponent(post.thumbnail)}`}
                alt={post.caption}
              />
            </a>
          )
        })}
    </InstagramPosts>
  )
}

export default Instagram
