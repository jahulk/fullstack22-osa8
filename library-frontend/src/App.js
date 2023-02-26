import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client'
import {
  ALL_BOOKS,
  ALL_AUTHORS,
  CREATE_BOOK,
  EDIT_AUTHOR,
  USER,
} from './queries'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  const { refetch: refetchAuthors, ...authors } = useQuery(ALL_AUTHORS)
  const { refetch: refetchUser, ...user } = useQuery(USER)
  const { refetch: refetchBooks, ...books } = useQuery(ALL_BOOKS)

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

  useEffect(() => {
    refetchUser()
  }, [token, refetchUser])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && (
          <button onClick={() => setPage('recommendation')}>recommend</button>
        )}
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

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} addBook={addBook} setPage={setPage} />

      {token && <Recommendation show={page === 'recommendation'} user={user} books={books} />}

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
