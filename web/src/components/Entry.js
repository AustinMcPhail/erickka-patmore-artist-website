import SanityImage from "gatsby-plugin-sanity-image"
import React, { useEffect } from "react";
import styled from "styled-components";
import PortableText from "./portableText";
import Share from "./Share";

const EntryStyles = styled.div`
  margin-bottom: 4rem;

  section {
    .title {
      margin-top: 1rem;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;

      h2 {
        font-weight: lighter;
      }
      p {
        font-style: italic;
        text-align: right;
      }
    }
  }
`;

const Entry = ({ entry, setSubtitle }) => {
  useEffect(() => {
    setSubtitle(entry.title);
  }, [entry.title, setSubtitle]);
  return (
    <EntryStyles>
      <SanityImage
        {...entry.portfolioImage}
        width={400}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <section>
        <div className="title">
          <h2>{entry.title}</h2>
          <div>
            {entry.portfolioImage.mediums && entry.portfolioImage.mediums.length > 0 && (
              <p>{entry.portfolioImage.mediums.map((m) => m.name).join(", ")}</p>
            )}
            {entry.portfolioImage.dimensions && <p>{entry.portfolioImage.dimensions}</p>}
          </div>
        </div>
        <Share />
        {entry._rawExcerpt && <PortableText blocks={entry._rawExcerpt} />}
      </section>
    </EntryStyles>
  );
};

export default Entry;
