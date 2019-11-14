import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Tooltip from '@material-ui/core/Tooltip'
import DashboardIcon from '@material-ui/icons/Dashboard'
// import StoreIcon from '@material-ui/icons/Store'
import PeopleIcon from '@material-ui/icons/People'
import LayersIcon from '@material-ui/icons/Layers'
import DocsIcon from '@material-ui/icons/AllInbox'
import EmailIcon from '@material-ui/icons/Email'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'

export const MainListItems = withRouter(
  ({ location }: RouteComponentProps): JSX.Element => {
    const isPath = (path: string): boolean => path === location.pathname

    const link = (
      label: string,
      path: string,
      icon: JSX.Element
    ): JSX.Element => (
      <ListItem button component={ Link } to={ path } selected={ isPath(path) }>
        <Tooltip title={ label }>
          <ListItemIcon>{icon}</ListItemIcon>
        </Tooltip>
        <ListItemText primary={ label } />
      </ListItem>
    )

    return (
      <div>
        {link('Dashboard', '/', <DashboardIcon />)}
        {link('Documents', '/documents', <DocsIcon />)}
        {link('Packages', '/packages', <LayersIcon />)}
        {link('Email Templates', '/email-templates', <EmailIcon />)}
        {link('Account', '/account', <PeopleIcon />)}
      </div>
    )
  }
)

export const secondaryListItems = (
  <div>
    <ListItem
      button
      component='a'
      href='mailto:info@canyoncompliance.com?subject=Hello Canyon Compliance. May I Suggest Something?'
      target='_blank'
    >
      <ListItemIcon>
        <EmailIcon />
      </ListItemIcon>
      <ListItemText primary='Give Feedback' />
    </ListItem>
  </div>
)
