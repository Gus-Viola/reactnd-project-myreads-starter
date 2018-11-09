import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'

export default class SearchBooks extends Component {

  state = {
    books: [],
    query: '',
    errorSearching: false
  }

  updateQuery = (query) => {
    this.setState({ query: query })

    //refactoring of the shelving and auxliary functions
    const books  = this.state.books.map(book => {
        const found = this.props.appStateBooks.find(appBook => appBook.id === book.id);
        if(found) {
            return found;
        } else {
            return book
        }
    })

    if (query) {

      BooksAPI.search(query.trim()).then(
          books => {
            if(query===this.state.query) {
              if (books.length > 0) {
                this.setState({books: books, errorSearching: false})
                // this.shelving(this.state.books)
                this.setState({ books });
              } else {
                this.setState({ books: [], errorSearching: true})
              }}}).then(this.setState({ books }));
            }  else {
              this.setState({ books: [], errorSearching: false });
            }//else

      // this.shelving(this.state.books)
      this.setState({ books });

  }//updateQuery


  //this is the general shelving function, aided by two subfunctions
  //It was refactored by use of the constant books inside the updateQuery
//   shelving = (array) => {
//     let resultingArray = array.map(searchBook => this.findShelf(searchBook))
//     this.noneShelf(resultingArray)
//     // this.props.updateState()
//   }//shelving
//
//   //if the book is in a shelf, it is returned; otherwise, zero
//   findShelf = (book) => {
//     let appStateBooks = this.props.appStateBooks
//     let foundBook = (appStateBooks.find(asBook => asBook.id === book.id ))
//     if (!foundBook) {
//       return 0
//     } else {
//     return foundBook
//   }
// }//findShelf
//
//   //this function replaces the zeroes for books in the shelf 'none'
//   noneShelf = (array) => {
//
//     const searchResultBooks = this.state.books
//     let returnArray = array
//     for (const [index, value] of array.entries()) {
//       if (value === 0) {
//         searchResultBooks[index].shelf = "none"
//         returnArray[index] = searchResultBooks[index]
//       } else {
//         returnArray[index] = value
//       }
//     }
//     this.setState({ books: returnArray})
//   }//noneShelf

  render() {
    const { updateState } = this.props;

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input
              type="text"
              placeholder="Search by title or author"
              value = {this.state.query}
              onChange={(event)=> this.updateQuery(event.target.value) }
            />
          </div>
        </div>
        {this.state.books.length > 0 && (
          <div className="search-books-results">
          <ol className="books-grid">
          {this.state.books.map(book => (
            <Book
              book={book}
              key={book.id}
              updateState={updateState}
            />
          ))}
          </ol>
          </div>
        )}
        {this.state.errorSearching && (
          <div>
          <h2>Empty Space</h2>
          <h1>No Books were found, please try again</h1>
          </div>
        )}
      </div>

    )
  }//render
}//SearchBooks
