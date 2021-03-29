const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/components/Layout.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMdx {
          nodes {
            fields {
              slug
            }
          }
        }
      }
    `
  )

  const posts = result.data.allMdx.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          slug: post.fields.slug,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value,
    })
  }
}
