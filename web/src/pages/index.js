import React, {useState, useEffect} from 'react'
import {graphql, Link} from 'gatsby'
import GraphQLErrorList from '../components/graphql-error-list'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Img from 'gatsby-image'

const {isFuture} = require('date-fns')

export const query = graphql`
  query {
    posts: allSanityPortfolioEntry(
      sort: {fields: [publishedAt], order: DESC}
      filter: {slug: {current: {ne: null}}, showOnHome: {ne: false}}
    ) {
      edges {
        node {
          publishedAt
          _id
          title
          slug {
            current
          }
          portfolioImage {
            alt
            dimensions
            mediums {
              name
            }
            asset {
              fluid(maxWidth: 700) {
                ...GatsbySanityImageFluid
              }
            }
          }
          _rawExcerpt
        }
      }
    }
  }
`
const IndexPage = (props) => {
  // const [current, setCurrent] = useState('')

  // const {data, errors} = props

  // if (errors) {
  //   return (
  //     <Layout>
  //       <GraphQLErrorList errors={errors} />
  //     </Layout>
  //   )
  // }

  // const site = (data || {}).site
  // const posts = data.posts.edges.filter(e => !isFuture(e.node.publishedAt)).map((e) => e.node) || []
  // const categories = data.categories.edges.map((e) => e.node) || []

  // if (!site) {
  //   throw new Error(
  //     'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
  //   )
  // }

  // const socials = {
  //   facebookUrl: site.facebookUrl,
  //   instagramUrl: site.instagramUrl
  // }

  // const NextArrow = (props) => {
  //   const {className, style, onClick} = props
  //   return (<div
  //     className={className}
  //     style={{...style, display: 'block', borderRadius: '50%', border: 'solid 1px gray', background: 'gray', opacity: 0.5}}
  //     onClick={onClick}
  //   />)
  // }

  // const PrevArrow = (props) => {
  //   const {className, style, onClick} = props
  //   return (<div
  //     className={className}
  //     style={{...style, display: 'block', borderRadius: '50%', border: 'solid 1px gray', background: 'gray', opacity: 0.5}}
  //     onClick={onClick}
  //   />)
  // }

  // const beforeChange = (_, index) => {
  //   console.log('changed', posts[index].slug.current)
  //   setCurrent(posts[index].slug.current)
  // }

  // useEffect(() => {
  //   if (posts.length) {
  //     setCurrent(posts[0].slug.current)
  //   }
  // }, [])

  // var settings = {
  //   className: '',
  //   infinite: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   fade: true,
  //   waitForAnimation: false,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   beforeChange: beforeChange,
  //   centerMode: true
  // }

  // const slides = posts.map(p => {
  //   return (
  //     <Link key={p.slug.current} style={{maxHeight: '100%'}} to={`/portfolio/${current}`}>
  //       <Img
  //         style={{maxHeight: '75vh'}}
  //         imgStyle={{objectFit: 'contain'}}
  //         fluid={p.portfolioImage.asset.fluid}
  //       />
  //     </Link>
  //   )
  // })

  return (
    <>
      <h1>Index</h1>
    </>
  )
}

export default IndexPage
