import React, {Component} from 'react'
import ShelfChanger from './ShelfChanger.js'
import noCoverImage from './icons/no-cover.png'

export default class Book extends Component {

  render () {

    const {book, updateState} = this.props;

    const availableCover = (book.imageLinks && book.imageLinks.thumbnail) ?  book.imageLinks.thumbnail : noCoverImage;
    const availableTitle = (book.title) ? book.title : "No Title"
    let availableAuthor = (book.authors) ? book.authors : "No Author"

    if (book.authors.length > 1) {
      availableAuthor =""
      for (let author in book.authors) {
        if (author == book.authors.length-1 ) {
          availableAuthor += book.authors[author]
        } else {
          if (author == book.authors.length-2) {
            availableAuthor += book.authors[author] + " and "
          } else
        availableAuthor += book.authors[author] + ", "}
      }
    }

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
