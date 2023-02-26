import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'
import BookList from './BookList'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState(null)

  const { refetch, ...booksByGenre } = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
  })

  useEffect(() => {
    refetch()
  }, [books, refetch])

  if (!show) {
    return null
  }

  if (booksByGenre.loading) {
    return <div>loading...</div>
  }

  const genres = new Set()
  books.data.allBooks.forEach((b) => {
    b.genres.forEach((g) => {
      genres.add(g)
    })
  })

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <b>{genre === null ? 'all books' : genre}</b>
      </p>
      <BookList books={booksByGenre.data.allBooks} />
      {[...genres].map((g, i) => (
        <button key={i} onClick={() => setGenre(g)}>
          {g}
        </button>
      ))}
      <button onClick={() => setGenre(null)}>all books</button>
    </div>
  )
}

export default Books
