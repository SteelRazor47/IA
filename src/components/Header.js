import React, { useContext } from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import { IconButton, Icon, Switch } from "@material-ui/core"
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh"
import Brightness3Icon from "@material-ui/icons/Brightness3"
import { Link as GatsbyLink } from "gatsby"
import { context } from "./provider"
import logo from "../assets/chip.svg"

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

  let toggle = <Switch checked={isDark} onChange={() => changeTheme(!isDark)} />
  let themeIcon = isDark ? <Brightness3Icon /> : <BrightnessHighIcon />
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, []);
  if (!hasMounted) {
    toggle = null
    themeIcon = null
  }

  const { sections, title } = props

  return (
    <React.Fragment>
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
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        {themeIcon}
        {toggle}
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
    </React.Fragment>
  )
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
}
