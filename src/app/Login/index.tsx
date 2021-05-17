import React from 'react'
import Spinner from 'app/common/Spinner'
import LoginComponent from './Login'
import { Redirect, withRouter, RouteComponentProps } from 'react-router'
import { useAuthQuery } from 'types/graphql'

const Login = (props: RouteComponentProps): JSX.Element => {
  const {  data, loading }   = useAuthQuery()

  if (loading) return <Spinner />
  if (data && data.auth) return <Redirect to='/' />

  return <LoginComponent { ...props } />
}

export default withRouter(Login)
