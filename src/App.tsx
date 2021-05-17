import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import AppContainer from 'app/AppContainer'

import client from './apollo'

const uri = `${process.env.REACT_APP_API_URI}/v0`

const App = (): JSX.Element => {
  return (
    <ApolloProvider client={ client(uri) }>
      <BrowserRouter>
        <AppContainer />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
