import { useState } from 'react'
import Select from 'react-select'

const Authors = ({ show, result, editAuthor }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedOption != null) {
      editAuthor({
        variables: {
          name: selectedOption.value,
          born: parseInt(born),
        },
      })
      setSelectedOption(null)
      setBorn('')
    }
  }

  const authors = result.data.allAuthors
  const options = authors.map((a) => ({
    value: a.name,
    label: a.name,
  }))

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          <label>
            born
            <input
              type="number"
              value={born}
              onChange={(e) => setBorn(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
