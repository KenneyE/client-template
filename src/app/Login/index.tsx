import React from 'react'
import Spinner from 'app/common/Spinner'
import LoginComponent from './Login'
import { Redirect, withRouter, RouteComponentProps } from 'react-router'
import { AuthComponent } from 'types/graphql'

const Login = (props: RouteComponentProps): JSX.Element => {
  return (
    <AuthComponent>
      {({ data, loading }): JSX.Element => {
        if (loading) return <Spinner />
        if (data && data.auth) return <Redirect to='/' />

        return <LoginComponent { ...props } />
      }}
    </AuthComponent>
  )
}

export default withRouter(Login)
