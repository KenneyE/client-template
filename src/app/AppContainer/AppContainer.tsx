import React from 'react'
import clsx from 'clsx'
import {
  makeStyles,
  MuiThemeProvider,
  Theme,
  StyleRules,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { MainListItems, secondaryListItems } from 'app/ListItems'
import ProfileMenu from 'app/ProfileMenu'

import theme from 'app/theme'

import Router from 'app/Router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const drawerWidth = 240

const useStyles = makeStyles(
  (theme: Theme): StyleRules => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    logo: {
      maxWidth: 170,
      maxHeight: 60,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      backgroundColor: '#f6f8fa',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
)

export interface Props {
  loggedIn: boolean;
}

const AppContainer = ({ loggedIn }: Props): JSX.Element => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const handleDrawerOpen = (): void => {
    setOpen(true)
  }
  const handleDrawerClose = (): void => {
    setOpen(false)
  }

  return (
    <MuiThemeProvider theme={ theme }>
      <CssBaseline />
      <div className={ classes.root }>
        {loggedIn ? (
          <>
            <AppBar
              position='absolute'
              className={ clsx(classes.appBar, open && classes.appBarShift) }
            >
              <Toolbar className={ classes.toolbar }>
                <IconButton
                  edge='start'
                  color='inherit'
                  aria-label='Open drawer'
                  onClick={ handleDrawerOpen }
                  className={ clsx(
                    classes.menuButton,
                    open && classes.menuButtonHidden
                  ) }
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  component='h1'
                  variant='h6'
                  color='inherit'
                  noWrap
                  className={ classes.title }
                >
                  Template App
                </Typography>
                <ProfileMenu />
              </Toolbar>
            </AppBar>
            <Drawer
              variant='permanent'
              classes={ {
                paper: clsx(
                  classes.drawerPaper,
                  !open && classes.drawerPaperClose
                ),
              } }
              open={ open }
            >
              <div className={ classes.toolbarIcon }>
                <img
                  className={ classes.logo }
                  src={ `${process.env.PUBLIC_URL}/logos/CanyonCompliance-orange.png` }
                  alt='Canyon Labs Logo'
                />
                <IconButton onClick={ handleDrawerClose }>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                <MainListItems />
              </List>
              <Divider />
              <List>{secondaryListItems}</List>
            </Drawer>
          </>
        ) : null}
        <main className={ classes.content }>
          <div className={ classes.appBarSpacer } />
          <Container maxWidth='xl' className={ classes.container }>
            <Router />
          </Container>
        </main>
      </div>
      <ToastContainer position={ toast.POSITION.BOTTOM_CENTER } />
    </MuiThemeProvider>
  )
}

export default AppContainer
