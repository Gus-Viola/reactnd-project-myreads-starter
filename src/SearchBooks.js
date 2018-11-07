import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
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

    if (query) {

      // console.log("1 Query is positive")

      BooksAPI.search(query.trim()).then(
          books => {
            if(query===this.state.query) {
              if (books.length > 0) {
                this.setState({books: books, errorSearching: false})
                // console.log("1.5 Setting state as ", books)
              } else {
                this.setState({ books: [], errorSearching: true})
              }}})
            }  else {
              this.setState({ books: [], errorSearching: false });
            }//else

      this.shelving(this.state.books)
  }//updateQuery

  shelving = (array) => {
    let resultingArray = array.map(searchBook => this.findShelf(searchBook))
    this.noneShelf(resultingArray)
  }//shelving

  findShelf = (book) => {
    let appStateBooks = this.props.appStateBooks
    let foundBook = (appStateBooks.find(asBook => asBook.id === book.id ))
    if (!foundBook) {
      return 0
    } else {
    return foundBook
  }
}//findShelf

  noneShelf = (array) => {

    const searchResultBooks = this.state.books
    let returnArray = array
    for (const [index, value] of array.entries()) {
      if (value === 0) {
        searchResultBooks[index].shelf = "none"
        returnArray[index] = searchResultBooks[index]
      } else {
        returnArray[index] = value
      }
    }
    // console.log ("Modified array is ", returnArray)
    this.setState({ books: returnArray})
  }//noneShelf


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



// <div>
//   {shelves.map((shelf, key) => {
//     booksOnShelf = this.state.books.filter(book => book.shelf == shelf.type);
//     return (
//       <div className = "bookshelf" key={key}>
//         <h2 className = "bookshelf-title"> {shelf.title}</h2>
//         <div className = "bookshelf-books">
//           <BookShelf books={booksOnShelf} updateState={updateState} />
//         </div>
//       </div>
//     )
//   })}
// </div>
