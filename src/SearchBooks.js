import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'


import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

export default class SearchBooks extends Component {

  state = {
    books: [],
    query: '',
    errorSearching: false
  }

  updateQuery = (query) => {
    this.setState({ query })

    let showingBooks

    if (query) {

      const match = new RegExp(escapeRegExp(query), 'i')

      BooksAPI.search(query.trim(), 20).then(books => {
        if (books.length > 0) {
          this.setState({books: books, errorSearching: false})
        } else {
          this.setState({ books: [], errorSearching: true })
        }})

      showingBooks = this.state.books.filter((searchBook)=> (match.test (searchBook.title)))

    }  else {this.setState({ books: [], errorSearching: false });}

    showingBooks = this.state.books

    showingBooks.sort(sortBy('title'))

  }



  render() {

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={this.props.onNavigate}>Close</a>
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
          <ol className="books-grid">
          {this.state.books.map(book => (
            <Book
              book={book}
              books={this.state.books}
              key={book.id}
              updateState={this.props.updateState}
            />
          ))}
          </ol>
        </div>
      </div>

    )
  }//render
}//SearchBooks
