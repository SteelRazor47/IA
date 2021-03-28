import React from "react"
import { makeStyles, Link, Paper, Typography } from "@material-ui/core"
import { Link as GatsbyLink } from "gatsby"

const useStyles = makeStyles(theme => ({
  toc: {
    position: "fixed",
    top: "50%",
    right: 0,
    transform: "translate(0, -50%)",
    maxHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  scroll: {
    scrollbarWidth: "none",
    overflowY: "scroll",
    "&::-webkit-scrollbar": { display: "none" },
    paddingLeft: theme.spacing(3),
    listStylePosition: "inside",
  },

  title: {
    margin: theme.spacing(1),
    overflow: "visible",
  },
}))

export default function ToC({ tableOfContents }) {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Paper className={classes.toc}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.title}
        >
          Indice
        </Typography>
        <ol className={classes.scroll}>
          {tableOfContents.items.map(i => (
            <li key={i.url}>
              <Link
                color="inherit"
                noWrap
                key={i.url}
                variant="body2"
                component={GatsbyLink}
                to={i.url}
              >
                {i.title}
              </Link>
            </li>
          ))}
        </ol>
      </Paper>
    </React.Fragment>
  )
}
