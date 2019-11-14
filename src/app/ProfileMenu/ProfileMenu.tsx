import React, { SyntheticEvent, useState } from 'react'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { Link } from 'react-router-dom'

export interface Props {
  logOut: () => void;
}

const ProfileMenu = ({ logOut }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  const handleMenu = (event: SyntheticEvent): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <div>
      <IconButton aria-haspopup='true' onClick={ handleMenu } color='inherit'>
        <AccountCircle />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={ anchorEl }
        anchorOrigin={ {
          vertical: 'top',
          horizontal: 'right',
        } }
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'right',
        } }
        open={ open }
        onClose={ handleClose }
      >
        <MenuItem component={ Link } to='/account' onClick={ handleClose }>
          Account
        </MenuItem>
        <MenuItem onClick={ logOut }>Log Out</MenuItem>
      </Menu>
    </div>
  )
}

export default ProfileMenu
