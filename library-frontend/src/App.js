import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_AUTHORS, CREATE_BOOK, EDIT_AUTHOR } from './queries'
import LoginForm from './components/LoginForm'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS, {
    // variables: {
    //   genre: 'SQL',
    // },
  })

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.log(error)
    },
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log(error)
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  useEffect(() => {
    const loggedUserToken = window.localStorage.getItem('library-user-token')
    if (loggedUserToken) {
      setToken(loggedUserToken)
    }
  }, [])

  // useEffect(() => {
  //   console.log(token)
  // }, [token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors
        show={page === 'authors'}
        result={authors}
        editAuthor={editAuthor}
      />

      <Books show={page === 'books'} result={books} />

      <NewBook show={page === 'add'} addBook={addBook} setPage={setPage} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
