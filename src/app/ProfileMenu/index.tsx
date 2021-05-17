import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Maybe, useAuthQuery } from 'types/graphql'
import ProfileMenuComponent from './ProfileMenu'

const ProfileMenu = (props: RouteComponentProps): Maybe<JSX.Element> => {
  const { client, data, loading }   = useAuthQuery({fetchPolicy: 'cache-only'})

  // We don't want this request to trigger a 401 error if not logged in yet.
  if (loading || !(data && data.auth)) return null

  const logOut = (): void => {
    fetch(`${process.env.REACT_APP_API_URI}/admins/sign_out`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((): void => {
      client.resetStore()
      props.history.push('/login')
    })
  }

  return <ProfileMenuComponent logOut={ logOut } />
}

export default withRouter(ProfileMenu)
