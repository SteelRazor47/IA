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


export default function Layout({ children }) {
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
        <Container maxWidth="lg">
          <Header title="IA" sections={sections} />
          {children}
          <Footer />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}
