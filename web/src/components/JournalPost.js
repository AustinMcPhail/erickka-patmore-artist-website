import { format, parseISO } from "date-fns";
import SanityImage from "gatsby-plugin-sanity-image"
import React from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
import PortableText from "./portableText";
import Share from "./Share";

const PostStyles = styled.article`
  display: flex;
  flex-direction: column;
  gap: var(--content-spacing);
  margin-bottom: 1rem;
  p {
    font-size: clamp(14px, 2.5vw, 1rem);
    a {
      word-break: break-all;
    }
  }
  .image-wrapper {
    max-height: clamp(400px, 40vh, 100%);
  }
`;

export const JournalPost = ({ prev, post, next }) => {
  return (
    <PostStyles>
      {post?.mainImage?.asset && (
        <SanityImage
          {...post.mainImage}
          width={400}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
      {post?.mainImage?.caption && (
        <p className="caption">
          <small>{post?.mainImage?.caption}</small>
        </p>
      )}
      <div className="title">
        <h2 className="title">{post.title}</h2>
        <small>{format(parseISO(post.publishedAt), "dd·MM·yyyy")}</small>
      </div>
      {post._rawBody && <PortableText blocks={post._rawBody} />}
      <Share />
      <Pagination
        baseUrl="/journal"
        nextText={prev?.title}
        prevText={next?.title}
        nextUrl={prev?.slug.current}
        prevUrl={next?.slug.current}
      />
    </PostStyles>
  );
};
