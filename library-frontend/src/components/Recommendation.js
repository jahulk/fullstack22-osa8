import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'
import BookList from './BookList'

const Recommendation = ({ show, user, books }) => {
  if (!show) {
    return null
  }

  const favoriteGenre = user.data.me.favoriteGenre
  const booksToShow = books.data.allBooks.filter(b => b.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
      <BookList books={booksToShow} />
    </div>
  )
}

export default Recommendation
