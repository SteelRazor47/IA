import React, {useState} from "react"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Header from "../components/Header"
import "@fontsource/roboto"

const sections = [
  { title: "Storia", url: "./history" },
  { title: "Etica", url: "./ethics" },
  { title: "Arte", url: "./art" },
  { title: "Matematica", url: "./maths" },
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
          <div style={{position: "fixed", bottom: "20px"}}>Icons made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}
