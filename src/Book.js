import React, {Component} from 'react'
import ShelfChanger from './ShelfChanger.js'

export default class Book extends Component {

  render () {

    const {book, updateState} = this.props;

    return(
      <div className="book" key={book.id}>
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + book.imageLinks.thumbnail + ")" }} />
            <ShelfChanger book={book} updateState={updateState} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
        <div>{book.shelf}</div>
      </div>
    )
  }


}
