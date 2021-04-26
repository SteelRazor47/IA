import React, { useContext } from "react"
import { Helmet } from "react-helmet"
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  CssBaseline,
  Container,
  Grid,
} from "@material-ui/core"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { sections } from "../assets/data"
import Header from "./Header"
import Footer from "./Footer"
import { context } from "./provider"
import logo from "../assets/chip.svg"
import ToC from "./ToC"
import "@fontsource/roboto"

export default function Layout({ data }) {
  const { body, tableOfContents } = data.mdx
  const darkMode = useContext(context).isDark
  const classes = useStyles()
  const darkTheme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          html: {
            scrollBehavior: "smooth",
          },
        },
      },
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
        <Container maxWidth={false}>
          <Header title="IA" sections={sections} />
          <Grid container>
            <Grid item xs={8}>
              <Container maxWidth="sm">
                <MDXRenderer>{body}</MDXRenderer>
              </Container>
            </Grid>
            <Grid item xs={4}>
              {typeof tableOfContents.items === "undefined" ? null : (
                <ToC tableOfContents={tableOfContents} />
              )}
            </Grid>
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
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
