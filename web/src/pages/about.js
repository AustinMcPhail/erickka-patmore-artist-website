import React from 'react'
import styled from 'styled-components'
import Instagram from '../components/Instagram'

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
      box-shadow: 0px 10px 20px 10px black;
    }
    100% {
      transform: translateY(0px);
      opacity: 1;
      box-shadow: 0px 15px 10px -10px black;
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

const ReachOutPage = (props) => (
  <ReachOutWrapper>
    <section aria-labelledby="instagram-header">
      <div className="heading">
        <hr />
        <h3 id="instagram-header">Instagram</h3>
        <hr />
      </div>
      <Instagram />
    </section>
    <section aria-labelledby="facebook-header">
      <div className="heading">
        <hr />
        <h3 id="facebook-header">Facebook</h3>
        <hr />
      </div>
      <iframe
        title="unique"
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ferickkasart&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
        width="340"
        height="500"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      />
    </section>
  </ReachOutWrapper>
)

export default ReachOutPage
