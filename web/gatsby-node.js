const {isFuture} = require('date-fns')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// const {format} = require('date-fns')
// TODO: Create the pages for each art piece
async function createBlogPostPages (graphql, actions) {
  const {createPage} = actions
  const result = await graphql(`
    {
      categories: allSanityCategory {
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
  if (result.errors) throw result.errors

  // TODO: Entry Pages
  // const entryEdges = (result.data.entries || {}).edges || []

  // entryEdges
  //   .filter(edge => !isFuture(edge.node.publishedAt))
  //   .forEach((edge, index) => {
  //     const {id, slug = {}, publishedAt, category} = edge.node
  //     const dateSegment = format(publishedAt, 'YYYY/MM')
  //     const path = `art/${category}/`

  //     createPage({
  //       path,
  //       component: require.resolve('./src/templates/blog-post.js'),
  //       context: {id}
  //     })
  //   })

  // TODO: Category Pages
  const categoryEdges = (result.data.categories || {}).edges || []
  categoryEdges.forEach((edge, index) => {
    const {current} = edge.node
    const path = `art/${current}`

    createPage({
      path,
      component: require.resolve('./src/templates/portfolio/category.js'),
      context: {slug: current}
    })
  })
}

exports.createPages = async ({graphql, actions}) => {
  await createBlogPostPages(graphql, actions)
}
