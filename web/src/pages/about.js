import { graphql } from "gatsby";
import SanityImage from "gatsby-plugin-sanity-image";
import React from "react";
import styled from "styled-components";
import PortableText from "../components/portableText";

export const query = graphql`
  query AboutPageQuery {
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

const AboutStyles = styled.div`
  .statement {
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 1fr;

    @media (min-width: 481px) {
      grid-template-columns: 1fr 4fr;
      grid-template-rows: unset;
    }

    gap: calc(2 * var(--content-spacing));

    p {
      a {
        word-wrap: break-all;
      }
    }

    .image-wrapper {
      height: 100%;

      @media (min-width: 1024px) {
        height: 100vh;
      }
    }
  }
`;

const ReachOutPage = ({ data: { site } }) => {
  return (
    <AboutStyles>
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
        <div className="text">
          {site._rawStatement && <PortableText blocks={site._rawStatement} />}
        </div>
      </div>
    </AboutStyles>
  );
};

export default ReachOutPage;
