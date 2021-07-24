// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'

// const url = '/.netlify/functions/instagram'

// const useInsta = () => {
//   const [posts, setPosts] = useState([])
//   useEffect(() => {
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => setPosts(data))
//   }, [])
//   return posts
// }

// const InstagramStyles = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-template-rows: repeat(8, 1fr);
//   @media (min-width: 1280px) {
//     grid-template-columns: repeat(4, 1fr);
//     grid-template-rows: repeat(4, 1fr);
//   }
//   a {
//     margin-bottom: 0;
//     img {
//       height: auto;
//       width: 100%;
//     }
//   }
//   gap: var(--content-spacing);
// `

// const Instagram = () => {
//   const insta = useInsta()

//   return (
//     <InstagramStyles>
//       {insta.length > 0 &&
//         insta.map((post) => (
//           <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer">
//             <img
//               src={`https://images.weserv.nl/?url=${encodeURIComponent(post.thumbnail)}`}
//               alt={post.caption}
//             />
//           </a>
//         ))}
//     </InstagramStyles>
//   )
// }

// export default Instagram
