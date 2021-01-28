import React, {useState} from "react"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "@fontsource/roboto"

const sections = [
  { title: "Storia", url: "/history" },
  { title: "Etica", url: "/ethics" },
  { title: "Arte", url: "/art" },
  { title: "Matematica", url: "/maths" },
]

export default function Home() {
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
        <Container maxWidth="lg" style={{lineHeight: 0}}>
          <Header title="IA" sections={sections} darkMode={darkMode} setDarkMode={setDarkMode} />
          <Footer />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}
