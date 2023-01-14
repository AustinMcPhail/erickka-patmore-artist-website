import { graphql } from "gatsby";
import SanityImage from "gatsby-plugin-sanity-image";
import React from "react";
import styled from "styled-components";
import PortableText from "../components/portableText";

export const query = graphql`
  query ThanksPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      _rawStatement
      author {
        image {
          ...ImageWithPreview
        }
        name
      }
      storeUrl
      cv {
        asset {
          url
        }
      }
    }
  }
`;

const ContactStyle = styled.div`
  .statement {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr;

    align-items: center;

    @media (min-width: 481px) {
      grid-template-columns: 1fr 4fr;
      grid-template-rows: unset;

      height: 100vh;
      overflow-y: hidden;
    }

    gap: calc(2 * var(--content-spacing));

    .image-wrapper {
      height: 100%;

      @media (min-width: 1024px) {
        height: 100vh;
      }
    }
  }
`;

const Contact = ({ data: { site } }) => {
  return (
    <ContactStyle>
      <div className="statement">
        <div className="image-wrapper">
          <SanityImage
            {...site.author.image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div>
            <h2>Thank you for reaching out!</h2>
            <p>I'll get back to you as soon as I can.</p>
        </div>
      </div>
    </ContactStyle>
  );
};

export default Contact;
