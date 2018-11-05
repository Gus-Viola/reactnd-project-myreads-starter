import React, {Component} from 'react'
import ShelfChanger from './ShelfChanger.js'
import Book from './Book.js'


export default class BookShelf extends Component {
  render(){

  const { books } = this.props;
  console.log(this.props);

    return(
      <div>
      <ol className="books-grid">
        {books.map(book => (
          <Book
            book={book}
            books={books}
            id={book.id}
          />
        ))}
      </ol>
      </div>
    )
  }
}
