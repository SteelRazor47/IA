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
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  toc: {
    position: "fixed",
    left: 'calc(50% + 400px)',
    top: "110px",
    maxHeight: "50vh",
    width: "310px",
    display: "flex",
    li: {
      lineHeight: 0,
    },
    marginTop: theme.spacing(3),
  },
  div: {
    overflow: "hidden",
    overflowY: "scroll",
  },
}))

function ToC({ children }) {
  return <ul className={useStyles().toc}>{children}</ul>
}

function InnerScroll({ children }) {
  return <div className={useStyles().div}>{children}</div>
}

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
          <Header title="IA" sections={sections} />
          {typeof tableOfContents.items === "undefined" ? null : (
            <ToC>
              <InnerScroll>
                <h2>Table of contents</h2>

                {tableOfContents.items.map(i => (
                  <li key={i.url}>
                    <a href={i.url} key={i.url}>
                      {i.title}
                    </a>
                  </li>
                ))}
              </InnerScroll>
            </ToC>
          )}

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
