import React from 'react'
import Dumb from './AppContainer'
import { AuthComponent } from 'types/graphql'

const AppContainer = (): JSX.Element => {
  return (
    <AuthComponent fetchPolicy='cache-only'>
      {({ data, loading }): JSX.Element | null => {
        if (loading) return null

        return <Dumb loggedIn={ Boolean(data && data.auth) } />
      }}
    </AuthComponent>
  )
}

export default AppContainer
