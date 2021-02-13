const { isFuture } = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function postPages ({ graphql, actions }) {
  console.log('\nCreating Post Pages\n')

  const {
    data: {
      allSanityPortfolioEntry: { edges: posts }
    }
  } = await graphql(`
    query {
      allSanityPortfolioEntry(
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
    }
  `)
  if (!posts) return
  posts.forEach((edge, index) => {
    const {
      _id,
      slug: { current }
    } = edge.node
    console.log(
      `Creating Post page at 'portfolio/${current}'`
    )
    const path = `portfolio/${current}`
    actions.createPage({
      path,
      component: require.resolve('./src/templates/portfolio/entry.js'),
      context: { _id }
    })
  })
  console.log('\nFinished creating Post Pages\n\n')
}

async function categoryPages ({ graphql, actions }) {
  console.log('\nCreating Category Pages\n')

  const {
    data: {
      allSanityCategory: { edges: categories }
    }
  } = await graphql(`
    query {
      allSanityCategory(filter: {slug: {current: {ne: null}}, enabled: {ne: false}}) {
        edges {
          node {
            title
            slug {
              current
            }
          }
        }
      }
    }
  `)
  if (!categories) return
  categories.forEach((edge, index) => {
    const {
      slug: { current }
    } = edge.node
    console.log(
      `Creating Category page at 'gallery/${current}'`
    )
    const path = `gallery/${current}`
    actions.createPage({
      path,
      component: require.resolve('./src/templates/portfolio/category.js'),
      context: { slug: current }
    })
  })
  console.log('\nFinished creating Category Pages\n\n')
}

async function journalPages ({ graphql, actions }) {
  console.log('\nCreating Journal Pages\n')

  const {
    data: {
      allSanityPost: { edges: allPosts }
    }
  } = await graphql(`
    query {
      allSanityPost(
        sort: {fields: [publishedAt], order: ASC}
      ) {
        edges {
          node {
            _id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)
  if (!allPosts) return
  const posts = allPosts.filter(e => !isFuture(e.node.publishedAt))
  posts.forEach((edge, i) => {
    const {
      _id,
      slug: { current }
    } = edge.node
    console.log(
      `Creating Journal page at 'journal/${current}'`
    )
    const path = `journal/${current}`
    actions.createPage({
      path,
      component: require.resolve('./src/templates/journalPost.js'),
      context: {
        prev_id: i === 0 ? null : posts[i - 1].node._id,
        curr_id: _id,
        next_id: i === (posts.length - 1) ? null : posts[i + 1].node._id
      }
    })
  })
  console.log('\nFinished creating Journal Pages\n\n')
}

exports.createPages = async (gqa) => {
  // 1. Create pages for Posts
  // 2. Create pages for Categories
  // 2. Create pages for Journal Entries
  await Promise.all([postPages(gqa), categoryPages(gqa), journalPages(gqa)])
  // await createPages(graphql, actions)
}
