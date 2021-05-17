import {
  ApolloClient,
  ApolloLink,
  RequestHandler,
  ServerError,
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { ContextSetter, setContext } from '@apollo/client/link/context'
import { toast } from 'react-toastify'
import { ErrorHandler, onError } from '@apollo/client/link/error'
import cache from 'localState/cache'

// headers is a function so we can test it...
export const headers: ContextSetter = () => ({
  headers: {
    authorization: localStorage.getItem('elevation-token') || '',
  },
})

const addTokenToHeaders = setContext(headers)
const showFeedbackHandler: RequestHandler = (operation, forward) => {
  return forward(operation).map(response => {
    // uncomment for debugging responses
    // console.log(response)

    // Using operationName isn't reliable in cases where the local mutation name
    // doesn't match the server's mutation name.
    // e.g. We use editUserBasicDetails locally but mutation is editUser
    // Fall back to just seeing if the first value in data has a message.
    const mutationResponse =
      response.data &&
      (response.data[operation.operationName] ||
        response.data[Object.keys(response.data)[0]])

    // if a successful mutation has a success message, display it
    if (mutationResponse && mutationResponse.message) {
      toast.success(mutationResponse.message.message, {
        autoClose: 3000,
      })
    }

    return response
  })
}
const showFeedback = new ApolloLink(showFeedbackHandler)

export const handleErrors: ErrorHandler = ({
  networkError = {},
  graphQLErrors,
}) => {
  const serverError = networkError as ServerError
  if (serverError.statusCode === 401) {
    // for some reason I can't figure out how to push location to history
    // so it refreshes here
    window.location.replace('/login')
  } else if (serverError.statusCode === 500 || serverError.statusCode === 400) {
    toast.error('Internal server error', {
      autoClose: 3000,
    })
  } else if (graphQLErrors) {
    graphQLErrors.forEach((error): void => {
      toast.error(error.message, {
        autoClose: 3000,
      })
    })
  }
}

const afterWare = onError(handleErrors)

const createApolloClient = (uri: string): ApolloClient<any> => {
  const httpLink = createUploadLink({ uri, credentials: 'include' })
  const link = afterWare.concat(
    // https://github.com/jaydenseric/apollo-upload-client/issues/213
    addTokenToHeaders.concat(
      showFeedback.concat((httpLink as unknown) as ApolloLink)
    )
  )

  return new ApolloClient({
    link,
    cache,
  })
}

export default createApolloClient
