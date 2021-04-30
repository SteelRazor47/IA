import React, { useContext, useMemo } from "react"
import { Helmet } from "react-helmet"
import {
  ThemeProvider,
  createMuiTheme,
  Typography,
  CssBaseline,
  Container,
  Grid,
} from "@material-ui/core"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import { sections } from "../assets/data"
import Header from "./Header"
import Footer from "./Footer"
import { context } from "./provider"
import logo from "../assets/chip.svg"
import ToC from "./ToC"
import "@fontsource/roboto"

const components = {
  h1: props => <Typography variant="h5" color="primary" {...props} />,
  h2: props => <Typography variant="h6" color="primary" {...props} />,
  h3: props => <Typography variant="h7" color="primary" {...props} />,
}

export default function Layout({ data }) {
  const { body, tableOfContents } = data.mdx
  const tableOfContentsItems = tableOfContents.items.slice(
    1,
    tableOfContents.items.length
  )
  const darkMode = useContext(context).isDark
  const darkTheme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: {
            main: darkMode ? "#c51162" : "#7986cb",
          },
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
      }),
    [darkMode]
  )

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
            <Grid item xs={12} md={8}>
              <Container maxWidth="sm">
                <MDXProvider components={components}>
                  <MDXRenderer>{body}</MDXRenderer>
                </MDXProvider>
              </Container>
            </Grid>
            <Grid item xs={false} md={4}>
              {typeof tableOfContentsItems === "undefined" ? null : (
                <ToC tableOfContents={tableOfContentsItems} />
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
