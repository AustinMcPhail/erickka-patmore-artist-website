import React from 'react'
import {graphql} from 'gatsby'
import styled from 'styled-components'
import GraphQLErrorList from '../components/graphql-error-list'
import Layout from '../components/core/layout'
import Instagram from '../components/Instagram'

export const query = graphql`
  query ReachOutPageQuery {
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
      facebookUrl
      instagramUrl
      backgroundColor {
        rgb {
          r
          g
          b
          a
        }
        hsl {
          h
          s
          l
          a
        }
      }
      fontColor {
        rgb {
          r
          g
          b
          a
        }
      }
    }
    categories: allSanityCategory(filter: {enabled: {ne: false}}) {
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
`

const ReachOutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-items: center;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr auto;
  }
  
  section {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  iframe {
    align-self: center;
    animation: fadeInFacebook 1s ease-in-out forwards;
    opacity: 0;
    animation-delay: 2s;
    border-radius: 10px;
    transform: translateY(-10px);
    @media (max-width: 320px) {
      width: 95vw;
    }
  }

  @keyframes fadeInFacebook {
    0% {
      transform: translateY(-10px);
      opacity: 0;
      box-shadow: 0px 10px 20px 10px
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

  .heading {
    display: flex;
    align-items: center;
    margin-block-end: 1rem;
    hr {
      width: 100%;
      border-color: ${(props) => props.theme.fontColor};
    }

    h3 {
      text-align: center;
      width: 50%;
      margin-inline-start: 1rem;
      margin-inline-end: 1rem;
    }
  }
`

const ReachOutPage = (props) => {
  const {data, errors} = props
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const categories = data.categories.edges.map((e) => e.node) || []
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  const socials = {
    facebookUrl: site.facebookUrl,
    instagramUrl: site.instagramUrl
  }
  return (
    <ReachOutWrapper>
      <section aria-labelledby='instagram-header'>
        <div className='heading'>
          <hr />
          <h3 id='instagram-header'>Instagram</h3>
          <hr />
        </div>
        <Instagram />
      </section>
      <section aria-labelledby='facebook-header'>
        <div className='heading'>
          <hr />
          <h3 id='facebook-header'>Facebook</h3>
          <hr />
        </div>
        <iframe
          src='https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ferickkasart&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId'
          width='340'
          height='500'
          style={{border: 'none', overflow: 'hidden'}}
          scrolling='no'
          frameBorder='0'
          allowtransparency='true'
          allow='encrypted-media'
        />
      </section>
    </ReachOutWrapper>
  )
}

export default ReachOutPage
