import { graphql } from "gatsby";
import SanityImage from "gatsby-plugin-sanity-image"
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
    display: flex;
    flex-direction: column;

    align-items: center;

    gap: calc(2 * var(--content-spacing));

    p {
      a {
        word-wrap: break-all;
      }
    }

    @media (min-width: 1024px) {
      flex-direction: row;
    }

    .gatsby-image-wrapper {
      width: 100%;

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
        <SanityImage
          {...site.author.image}
          width={400}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div className="text">
          {site._rawStatement && <PortableText blocks={site._rawStatement} />}
        </div>
      </div>
    </AboutStyles>
  );
};

export default ReachOutPage;
