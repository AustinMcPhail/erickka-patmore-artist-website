import { graphql } from "gatsby";
import SanityImage from "gatsby-plugin-sanity-image";
import React from "react";
import styled from "styled-components";
import PortableText from "../components/portableText";

export const query = graphql`
  query ContactPageQuery {
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

  form {
    display: grid;
    grid-template-columns: 1fr;
  }

  form label {
    font-size: 1.2rem;
  }

  form input,
  form textarea {
    padding: calc(0.5 * var(--content-spacing));
    border: 1px solid var(--color-primary);
    outline: none;
    border-radius: 2px;
    font-size: 1.2rem;
    margin-bottom: var(--content-spacing);
  }

  form button {
    padding: calc(0.5 * var(--content-spacing));
    border: 1px solid var(--color-primary);
    outline: none;
    border-radius: 2px;
    font-size: 1.2rem;
    margin-bottom: var(--content-spacing);
    background: var(--color-primary);
    color: #fff;
    cursor: pointer;
  }
`;

const Contact = ({ data: { site } }) => {
  const inbox = "";
  const dev = process.env.GATSBY_DEVELOPMENT;
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
        <div className="form">
          <h2>Get In Touch</h2>

          <form action={`https://formsubmit.co/${inbox}`} method="POST" id="contactform">
            <label for="name">Name</label>
            <input type="text" class="form-control" id="name" name="name" placeholder="Name" />

            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="Email" />

            <label for="email">Subject</label>
            <input
              type="text"
              class="form-control"
              id="subject"
              name="_subject"
              placeholder="Inquiry"
            />

            <label for="message">Message</label>
            <textarea
              class="form-control"
              id="message"
              name="message"
              rows="3"
              placeholder="Write your message here..."
            />

            <input
              type="hidden"
              name="_next"
              value={`${dev ? "http://localhost:8000" : "https://erickka.art"}/thank-you`}
            />
            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="box" />
            <button type="submit" class="btn btn-primary">
              Send
            </button>
          </form>
        </div>
      </div>
    </ContactStyle>
  );
};

export default Contact;
