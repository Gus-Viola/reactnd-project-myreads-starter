import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'



export default class ShelfChanger extends Component {

  render () {

    const {book, updateState} = this.props

    return (
      <div className="book-shelf-changer">
        <select value={book.shelf} onChange={e => BooksAPI.update(book, e.target.value).then(updateState())}>
          <option value="move" disabled>Move to...</option>
          <option value ="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }

}
