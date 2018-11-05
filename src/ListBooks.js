import React, {Component} from 'react'
import BookShelf from './BookShelf.js'
// import App from './App.js'


export default class ListBooks extends Component {
  render() {

    const { books, updateState } = this.props;

    const shelves = [
      { type: 'currentlyReading', title: 'Currently Reading' },
      { type: 'wantToRead', title: 'Want to Read' },
      { type: 'read', title: 'Read' }
                    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf, key) => {
              const booksOnShelf = books.filter(book => book.shelf === shelf.type);
              return (
                <div className = "bookshelf" key={key}>
                  <h2 className = "bookshelf-title"> {shelf.title}</h2>
                  <div className = "bookshelf-books">
                    <BookShelf books={booksOnShelf} updateState={updateState} />
                  </div>
                </div>
              )

            })}
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )

  }//render
}//ListBooks
