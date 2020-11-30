import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Header from "./Header"

const useStyles = makeStyles(theme => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))

const sections = [
  { title: "Storia", url: "#" },
  { title: "Etica", url: "#" },
  { title: "Arte", url: "#" },
  { title: "Matematica", url: "#" },
]

export default function Blog() {
  const classes = useStyles()

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="IA" sections={sections} />
      </Container>
    </React.Fragment>
  )
}
