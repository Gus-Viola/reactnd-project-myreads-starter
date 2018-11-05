import React, {Component} from 'react'
import Book from './Book.js'


export default class BookShelf extends Component {

  render(){

    const { books, updateState } = this.props;

    return(
        <div>
        <ol className="books-grid">
          {books.map(book => (
            <Book
              book={book}
              books={books}
              key={book.id}
              updateState={updateState}
            />
          ))}
        </ol>
        </div>
      )
  }//render
}//BookShelf
