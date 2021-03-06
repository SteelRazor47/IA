import React, { useContext, useState } from "react"
import {
  makeStyles,
  Toolbar,
  Typography,
  Link,
  Icon,
  IconButton,
  Switch,
  Drawer,
  Hidden,
  Divider,
  AppBar,
  Slide,
  useTheme,
  useScrollTrigger,
} from "@material-ui/core"
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh"
import Brightness3Icon from "@material-ui/icons/Brightness3"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import MenuIcon from "@material-ui/icons/Menu"
import { Link as GatsbyLink } from "gatsby"
import { context } from "./provider"
import logo from "../assets/chip.svg"
import { ToCDrawer } from "./ToC"

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}))

export default function Header(props) {
  const isDark = useContext(context).isDark
  const changeTheme = useContext(context).changeTheme
  const classes = useStyles()
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const theme = useTheme()

  let toggle = <Switch checked={isDark} onChange={() => changeTheme(!isDark)} />
  let themeIcon = isDark ? <Brightness3Icon /> : <BrightnessHighIcon />
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    toggle = null
    themeIcon = null
  }

  const { sections, title, table } = props

  return (
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar
          color={theme.palette.background.default}
          elevation={0}
          position="sticky"
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              component={GatsbyLink}
              to="/"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon fontSize="large">
                <img
                  src={logo}
                  style={{ height: "100%", lineHeight: "normal" }}
                  alt="Logo icon"
                />
              </Icon>
            </IconButton>

            <Typography
              component="h2"
              variant="h5"
              color="primary"
              align="center"
              noWrap
              className={classes.toolbarTitle}
            >
              {title}
            </Typography>
            <Hidden smDown>
              {themeIcon}
              {toggle}
            </Hidden>
            <Hidden mdUp>
              <IconButton
                onClick={() => {
                  setDrawerOpen(true)
                }}
                className={classes.button}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </Toolbar>
          <Toolbar
            component="nav"
            variant="dense"
            className={classes.toolbarSecondary}
          >
            {sections.map(section => (
              <Link
                color="inherit"
                noWrap
                key={section.title}
                variant="body2"
                component={GatsbyLink}
                to={section.url}
                className={classes.toolbarLink}
              >
                {section.title}
              </Link>
            ))}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Toolbar>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <ChevronRightIcon />
          </IconButton>
          <span style={{ flex: 1 }} />
          {themeIcon}
          {toggle}
        </Toolbar>
        <Divider />
        <ToCDrawer
          tableOfContents={table}
          closeDrawer={() => setDrawerOpen(false)}
        />
      </Drawer>
    </React.Fragment>
  )
}

function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}
