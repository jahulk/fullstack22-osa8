import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)

  const allBooks = useQuery(ALL_BOOKS)

  const books = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
  })

  if (!show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  const genres = new Set()
  allBooks.data.allBooks.forEach((b) => {
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
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published && a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
