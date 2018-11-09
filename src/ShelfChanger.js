import React from 'react'

//simplified this component to a stateless function
// export default class ShelfChanger extends Component {
const ShelfChanger = props => {

  // render () {

    const book = props.book
    const updateState = props.updateState

    return (
      <div className="book-shelf-changer">
        <select
          value={book.shelf ? book.shelf: 'none'}
          onChange={e =>  updateState(e.target.value, book)}>
          <option value="move" disabled>Move to...</option>
          <option value ="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }

export default ShelfChanger
