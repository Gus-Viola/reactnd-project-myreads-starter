import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'

export default class SearchBooks extends Component {

  state = {
    books: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query })

    if (query) {

      BooksAPI.search(query.trim()).then(books => {
        if (books.length > 0) {
          this.setState({books: books})
        } else {
          this.setState({ books: []})
        }})

    }  else {this.setState({ books: [] });
    }
  }



  render() {

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
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
