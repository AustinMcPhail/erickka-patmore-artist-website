import { graphql } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import Layout from '../components/core/layout'
import GraphQLErrorList from '../components/graphql-error-list'

export const query = graphql`
  query CvPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      cv {
        asset {
          url
        }
      }
    }
  }
`

const Cv = styled.section`
  display: flex;
  flex-direction: column;
`
const DownloadWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  justify-content: space-between;
`
const AccentDivider = styled.hr`
  border: solid 1px ${(props) => props.theme.fontColor};
  width: 90%;
  margin: 0;
`

const CvDownload = styled.a`
  padding: 0.5em;
  margin-left: 1em;
  border: solid 2px ${(props) => props.theme.fontColor};
  border-radius: 2px;
  text-align: center;
  :focus {
    outline: dashed 1px ${(props) => props.theme.fontColor};
  }
`

const CvPreview = styled.iframe`
  animation: fadeIn 2s ease-in-out forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      box-shadow: 0px 10px 20px 5px black;
    }
    100% {
      opacity: 1;
      box-shadow: 0px 15px 10px -10px black;
    }
  }
  width: 100%;
  border-radius: 2px;
  height: 75vh;
  margin-bottom: 1em;
`

const CvPage = (props) => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const { site } = data || {}

  return (
    <Cv>
      <DownloadWrapper>
        <AccentDivider />
        <CvDownload href={`${site.cv.asset.url}?dl=`}>Download CV</CvDownload>
      </DownloadWrapper>
      <CvPreview
        src={`https://docs.google.com/gview?url=${site.cv.asset.url}&embedded=true`}
        frameBorder={0}
      />
    </Cv>
  )
}

export default CvPage
