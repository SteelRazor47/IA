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
      resolve: "gatsby-source-filesystem",
      options: {
        name: "mdxPages",
        path: `${__dirname}/src/assets/aspetti-tecnici-img`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "mdxPages",
        path: `${__dirname}/src/assets/applicazioni-reali-img`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "mdxPages",
        path: `${__dirname}/src/assets/aspetti-giuridici-img`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/Layout.js"),
        },
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
          "gatsby-remark-images",
        ],
      },
    },
    "gatsby-theme-material-ui",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-remark-images",
  ],
  pathPrefix: "/IA",
}
