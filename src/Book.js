import React, {Component} from 'react'
import ShelfChanger from './ShelfChanger.js'

export default class Book extends Component {
  render () {

    const {book, books, id} = this.props;

    return(
      <div className="book" key={id}>
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + book.imageLinks.thumbnail + ")" }} />
            <ShelfChanger />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    )
  }


}
