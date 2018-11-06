import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'


import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

export default class SearchBooks extends Component {

  state = {
    books: [],
    query: '',
    searchErr: false
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim()})

    let showingBooks

    if (query) {

      BooksAPI.search(query.trim(), 20).then(books => {
    books.length > 0
      ? this.setState({ books: books, searchErr: false })
      : this.setState({ books: [], searchErr: true });
  });

  // if query is empty => reset state to default
} else this.setState({ books: [], searchErr: false });

    showingBooks = this.state.books


  }


//   componentDidUpdate() {
//   BooksAPI.search(this.state.query, 20).then(array => {
//     this.setState({
//       books: array
//     });
//   });
// }//componentDidMount
//
//
//   componentDidMount() {
//   BooksAPI.search(this.state.query, 20).then(array => {
//     this.setState({
//       books: array
//     });
//   });
// }//componentDidMount


  render() {



    // if (this.state.query) {
    //   const match = new RegExp(escapeRegExp(this.state.query), 'i')
    //   // showingBooks = this.state.books.filter((searchBook)=> (match.test (searchBook.title) || (searchBook.authors)))
    //   showingBooks = this.state.books.filter((searchBook)=> (match.test (searchBook.title)))
    // } else {
    //   showingBooks = this.state.books
    // }

    // showingBooks.sort(sortBy('title')) //or author?

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value = {this.state.query}
              onChange={(event)=> this.updateQuery(event.target.value) }
            />

          </div>
        </div>
        <div className="search-books-results">
        {JSON.stringify(this.state)}
          <ol className="books-grid">
          {this.state.books.map(book => (
            <Book
              book={book}
              books={this.state.books}
              key={book.id}
            />
          ))}
          </ol>
        </div>
      </div>

    )
  }//render
}//SearchBooks
