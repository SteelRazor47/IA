import React, { useState, useEffect } from "react"
import { makeStyles, Link, Paper, Typography } from "@material-ui/core"
import { Link as GatsbyLink } from "gatsby"

const useStyles = makeStyles(theme => ({
  toc: {
    position: "fixed",
    top: "50%",
    width: "30%",
    right: theme.spacing(3),
    transform: "translate(0, -50%)",
    maxHeight: "40vh",
    display: "flex",
    flexDirection: "column",
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
      borderBottom: "solid 1px #000",
      transform: "scaleX(0)",
      transition: "transform 250ms ease-in-out",
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
      borderBottom: "solid 1px #000",
      transform: "scaleX(1)",
      transition: "transform 250ms ease-in-out",
      transformOrigin: "0 50%",
    },
  },
}))

function renderItems(items, activeId) {
  return (
    <ul style={{ listStyleType: "none" }}>
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
                ? useStyles().activeUnderline
                : useStyles().underline
            }
          >
            {item.title}
          </Link>
          {item.items && renderItems(item.items)}
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
        observer.unobserve(document.getElementById(id))
      })
    }
  }, [itemIds])

  return activeId
}

export default function ToC({ tableOfContents }) {
  const idList = getIds(tableOfContents.items)
  const activeId = useActiveId(idList)
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
        <div className={classes.scroll}>
          {renderItems(tableOfContents.items, activeId)}
        </div>
      </Paper>
    </React.Fragment>
  )
}
