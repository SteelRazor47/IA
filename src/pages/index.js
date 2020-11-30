import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Header from "../components/Header"

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))

const sections = [
  { title: "Storia", url: "./history" },
  { title: "Etica", url: "./ethics" },
  { title: "Arte", url: "./art" },
  { title: "Matematica", url: "./maths" },
]

export default function Home() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="false">
        <Header title="IA" sections={sections} />
      </Container>
    </React.Fragment>
  )
}
