import React, { useContext } from "react"
import { sections } from "../assets/data"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Header from "./Header"
import Footer from "./Footer"
import "@fontsource/roboto"
import { context } from "./provider"

export default function Layout({ children }) {
  const darkMode = useContext(context).isDark
  const darkTheme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  })

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="lg" style={{ lineHeight: 0 }}>
          <Header title="IA" sections={sections} />
          {children}
          <Footer />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}
