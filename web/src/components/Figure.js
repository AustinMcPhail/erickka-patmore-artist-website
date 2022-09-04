import React from "react";
import SanityImage from "gatsby-plugin-sanity-image"

const Fig = ({ node }) => {
  if (!node || !node.asset) {
    return null;
  }

  return (
    <figure>
      <SanityImage
        {...node}
        width={500}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </figure>
  );
};
export default Fig;
