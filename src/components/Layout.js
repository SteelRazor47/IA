import React, { useState } from "react"
import { sections } from "../assets/data"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "@fontsource/roboto"

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false)
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
          <Header
            title="IA"
            sections={sections}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          {children}
          <Footer />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}
