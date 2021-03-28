import React, { useContext } from "react"
import { sections } from "../assets/data"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Header from "./Header"
import Footer from "./Footer"
import "@fontsource/roboto"
import { context } from "./provider"
import { Helmet } from "react-helmet"
import logo from "../assets/chip.svg"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import ToC from "./ToC"

export default function Layout({ data }) {
  const { body, tableOfContents } = data.mdx
  const darkMode = useContext(context).isDark
  const darkTheme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  })

  return (
    <React.Fragment>
      <Helmet>
        <title>IA</title>
        <link rel="icon" type="image/png" href={logo} sizes="16x16" />
      </Helmet>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="md">
          {typeof tableOfContents.items === "undefined" ? null : (
            <ToC tableOfContents={tableOfContents}/>
          )}
          <Header title="IA" sections={sections} />

          <MDXRenderer>{body}</MDXRenderer>
          <Footer />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}

export const query = graphql`
  query PostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      tableOfContents
    }
  }
`
