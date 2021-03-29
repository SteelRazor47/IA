/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "mdxPages",
        path: `${__dirname}/src/mdxPages/`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.js"),
        },
        gatsbyRemarkPlugins: [`gatsby-remark-autolink-headers`],
      },
    },
    "gatsby-theme-material-ui",
    "gatsby-plugin-react-helmet",
  ],
  pathPrefix: "/IA",
}
