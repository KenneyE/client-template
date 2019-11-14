import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

const Router = (): JSX.Element => {
  return (
    <Switch>
      {/*<PrivateRoute exact path='/' component={ Home } />*/}

      {/*<Route exact path='/login' component={ Login } />*/}
      <Redirect to='/' />
    </Switch>
  )
}

export default Router
