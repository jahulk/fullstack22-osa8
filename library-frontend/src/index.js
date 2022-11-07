import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
  ApolloProvider,
} from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/',
  }),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)