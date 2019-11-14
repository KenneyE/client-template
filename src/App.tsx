import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import HttpsRedirect from 'react-https-redirect'

import client from './apollo'

const App = (): JSX.Element => {
  return (
    <HttpsRedirect>
      <ApolloProvider client={ client }>
        <BrowserRouter>
          <div>Hello</div>
        </BrowserRouter>
      </ApolloProvider>
    </HttpsRedirect>
  )
}

export default App
