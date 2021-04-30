import React, { useState, useEffect } from "react"
import { makeStyles, Link, Paper, Typography } from "@material-ui/core"
import { Link as GatsbyLink } from "gatsby"

const useStyles = makeStyles(theme => ({
  toc: {
    position: "sticky",
    top: "50%",
    padding: theme.spacing(4),
    transform: "translate(0, -50%)",
    maxHeight: "50vh",
    display: "flex",
    flexDirection: "column",
  },
  ulFirstLevel: {
    listStyleType: "none",
    paddingLeft: theme.spacing(0),
  },
  ulOther: {
    listStyleType: "none",
    paddingLeft: theme.spacing(4),
  },
  scroll: {
    scrollbarWidth: "none",
    overflowY: "scroll",
    "&::-webkit-scrollbar": { display: "none" },
    padding: theme.spacing(0),
    listStylePosition: "inside",
  },
  title: {
    margin: theme.spacing(1),
    overflow: "visible",
  },
  underline: {
    position: "relative",
    display: "inline-block",
    "&:after": {
      display: "block",
      content: "''",
      borderBottom: `solid 2px ${theme.palette.text.primary}`,
      transform: "scaleX(0)",
      transition: "transform 1000ms ease-in-out",
      transformOrigin: "100% 50%",
    },
    "&:hover": {
      textDecoration: "none",
      "&:after": {
        transform: "scaleX(1)",
        transformOrigin: "0 50%",
      },
    },
  },
  activeUnderline: {
    position: "relative",
    display: "inline-block",
    "&:after": {
      display: "block",
      content: "''",
      borderBottom: `solid 2px ${theme.palette.text.primary}`,
      transform: "scaleX(1)",
      transition: "transform 1000ms ease-in-out",
      transformOrigin: "0 50%",
    },
    "&:hover": {
      textDecoration: "none",
    },
  },
}))

function renderItems(items, activeId, classes, style) {
  return (
    <ul className={style}>
      {items.map(item => (
        <li key={item.url}>
          <Link
            color="inherit"
            noWrap
            key={item.url}
            variant="body2"
            component={GatsbyLink}
            to={item.url}
            className={
              activeId === item.url.slice(1)
                ? classes.activeUnderline
                : classes.underline
            }
          >
            {item.title}
          </Link>
          {item.items &&
            renderItems(item.items, activeId, classes, classes.ulOther)}
        </li>
      ))}
    </ul>
  )
}

function getIds(items) {
  return items.reduce((acc, item) => {
    if (item.url) {
      // url has a # as first character, remove it to get the raw CSS-id
      acc.push(item.url.slice(1))
    }
    if (item.items) {
      acc.push(...getIds(item.items))
    }
    return acc
  }, [])
}

function useActiveId(itemIds) {
  const [activeId, setActiveId] = useState(``)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    itemIds.forEach(id => {
      observer.observe(document.getElementById(id))
    })

    return () => {
      itemIds.forEach(id => {
        if (document.getElementById(id) !== null)
          observer.unobserve(document.getElementById(id))
      })
    }
  }, [itemIds])

  return activeId
}

export default function ToC({ tableOfContents }) {
  const idList = getIds(tableOfContents)
  const activeId = useActiveId(idList)
  const classes = useStyles()
  return (
    <React.Fragment>
      <Paper className={classes.toc}>
        <Typography
          component="h2"
          variant="h5"
          color="primary"
          align="center"
          noWrap
          className={classes.title}
        >
          Indice
        </Typography>
        <div className={classes.scroll}>
          {renderItems(
            tableOfContents,
            activeId,
            classes,
            classes.ulFirstLevel
          )}
        </div>
      </Paper>
    </React.Fragment>
  )
}
