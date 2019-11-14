import { ApolloClient } from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'
import { ServerError } from 'apollo-link-http-common'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, FetchResult, Observable } from 'apollo-link'
import { toast } from 'react-toastify'
import resolvers from './app/resolvers'
import defaults from './app/defaults'
import introspectionQueryResultData from 'types/fragmentTypes'

type ServerErrorOrUndef = ServerError | undefined

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const cache = new InMemoryCache({ fragmentMatcher })

export const showFeedback = new ApolloLink((operation, forward): Observable<
FetchResult
> | null => {
  if (!forward) return null

  return forward(operation).map(
    (response: FetchResult): FetchResult => {
      // uncomment for debugging responses
      // console.log(response)

      // if a successful mutation has a success message, display it
      if (
        response.data &&
        response.data[operation.operationName] &&
        response.data[operation.operationName].message
      ) {
        toast.success(response.data[operation.operationName].message, {
          autoClose: 3000,
        })
      }

      return response
    }
  )
})

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError, response }): void => {
      const serverError: ServerErrorOrUndef = networkError as ServerErrorOrUndef

      if (graphQLErrors && response) {
        // graphQLErrors.map(({ message, locations, path }) =>
        //   console.log(
        //     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        //   )
        // );

        const errors = graphQLErrors.map((e): string => e.message)
        errors.forEach((error): number | string => toast.error(error))
        response.errors = undefined
      } else if (
        serverError &&
        serverError.statusCode === 401 &&
        window.location.pathname !== '/login'
      ) {
        // This also causes a browser refresh, which clears the cache.
        window.location.pathname = '/login'
      }
    }),
    withClientState({
      defaults,
      resolvers,
      cache,
    }),
    showFeedback.concat(
      createUploadLink({
        uri: `${process.env.REACT_APP_API_URI}/api/v0`,
        credentials: 'include',
      })
    ),
  ]),
  cache,
})

export default client
