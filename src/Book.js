import React, {Component} from 'react'
import ShelfChanger from './ShelfChanger.js'
import noCoverImage from './icons/no-cover.png'

export default class Book extends Component {

  render () {

    const {book, updateState} = this.props;

    const availableCover = (book.imageLinks && book.imageLinks.thumbnail) ?  book.imageLinks.thumbnail : noCoverImage;
    const availableTitle = (book.title) ? book.title : "No Title"
    const availableAuthor = (book.authors) ? book.authors : "No Author"

    return(
      <div className="book" key={book.id}>
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: "url(" + availableCover + ")" }} />
            <ShelfChanger book={book} updateState={updateState} />
        </div>
        <div className="book-title">{availableTitle}</div>
        <div className="book-authors">{availableAuthor}</div>
        <div>{book.shelf}</div>
      </div>
    )
  }


}
