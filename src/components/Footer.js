import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.liceoroiti.edu.it/">
        Liceo A. Roiti
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}))

export default function Footer(props) {
  const classes = useStyles()
  //const { description, title } = props

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        {/* <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography> */}
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Icons made by{" "}
          <Link
            href="https://www.flaticon.com/authors/kiranshastry"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kiranshastry
          </Link>{" "}
          from{" "}
          <Link
            href="https://www.flaticon.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.flaticon.com
          </Link>
        </Typography>
        <Copyright />
      </Container>
    </footer>
  )
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
}
