/* eslint-disable react/no-multi-comp, react/no-did-mount-set-state */
import { format, parseISO } from 'date-fns'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './IframePreview.module.css'

/**
 * Explore more examples of previews:
 * https://www.sanity.io/blog/evolve-authoring-experiences-with-views-and-split-panes
 */

const assemblePostUrl = ({ displayed, options }) => {
  const { slug, publishedAt } = displayed
  const { previewURL } = options
  if (!slug || !previewURL) {
    console.warn('Missing slug or previewURL', { slug, previewURL })
    return ''
  }
  const dateSegment = format(parseISO(publishedAt), 'YYYY/MM')
  const path = `/${dateSegment}/${slug.current}/`
  return `${previewURL}/blog${path}`
}

const IframePreview = ({ options, document }) => {
  const { displayed } = document

  if (!displayed) {
    return (
      <div className={styles.componentWrapper}>
        <p>There is no document to preview</p>
      </div>
    )
  }

  const url = assemblePostUrl({ displayed, options })

  if (!url) {
    return (
      <div className={styles.componentWrapper}>
        <p>Hmm. Having problems constructing the web front-end URL.</p>
      </div>
    )
  }

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.iframeContainer}>
        <iframe src={url} title={url} />
      </div>
    </div>
  )
}

IframePreview.propTypes = {
  document: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

IframePreview.defaultProps = {
  document: null,
}

export default IframePreview
