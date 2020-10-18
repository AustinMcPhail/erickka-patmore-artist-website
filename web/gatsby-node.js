const {isFuture} = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// const {format} = require('date-fns')
async function createPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
  fragment MainImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }
    {
      categories: allSanityCategory(filter: {slug: {current: {ne: null}}, enabled: {ne: false}}) {
        edges {
          node {
            title
            slug {
              current
            }
          }
        }
      }
      posts: allSanityPortfolioEntry(
        sort: {fields: [publishedAt], order: DESC}
        filter: {slug: {current: {ne: null}}}
      ) {
        edges {
          node {
            _id
            slug {
              current
            }
          }
        }
      }
      journalPosts: allSanityPost(
        sort: {fields: [publishedAt], order: ASC}
      ) {
        edges {
          node {
            _id
            publishedAt
            mainImage {
              ...MainImage
              alt
            }
            title
            _rawExcerpt
            slug {
              current
            }
          }
        }
      }
    }
  `)
  if (result.errors) throw result.errors

  const categoryEdges = (result.data.categories || {}).edges || []
  categoryEdges.forEach((edge, index) => {
    const {
      slug: {current}
    } = edge.node
    const path = `portfolio/${current}`
    createPage({
      path,
      component: require.resolve('./src/templates/portfolio/category.js'),
      context: {slug: current}
    })
  })

  const postEdges = (result.data.posts || {}).edges || []
  postEdges.forEach((edge, index) => {
    const {
      _id,
      slug: {current}
    } = edge.node
    const path = `portfolio/${current}`
    createPage({
      path,
      component: require.resolve('./src/templates/portfolio/entry.js'),
      context: {_id}
    })
  })

  let journalEdges = (result.data.journalPosts || {}).edges || []
  journalEdges = journalEdges.filter(e => !isFuture(e.node.publishedAt))
  journalEdges.forEach((edge, i) => {
    const {
      _id,
      slug: {current}
    } = edge.node
    const path = `journal/${current}`
    createPage({
      path,
      component: require.resolve('./src/templates/journalPost.js'),
      context: {
        prev_id: i === 0 ? null : journalEdges[i - 1].node._id,
        curr_id: _id,
        next_id: i === (journalEdges.length - 1) ? null : journalEdges[i + 1].node._id
      }
    })
  })
}

exports.createPages = async ({graphql, actions}) => {
  await createPages(graphql, actions)
}
