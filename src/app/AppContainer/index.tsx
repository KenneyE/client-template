import React from 'react'
import Dumb from './AppContainer'
import { AuthComponent, AuthQuery } from 'types/graphql'

const AppContainer = (): JSX.Element => {
  return (
    <AuthComponent>
      {({ data, loading }): JSX.Element | null => {
        if (loading) return null

        const { auth } = data as AuthQuery
        return <Dumb loggedIn={ auth } />
      }}
    </AuthComponent>
  )
}

export default AppContainer
