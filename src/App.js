import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'

export default class BooksApp extends React.Component {
  state = {
      books: []
  }

  updateState = (shelf, book) => {
    let newBooksOnShelf = []

    BooksAPI.update(book, shelf).then(object => {
      book.shelf = shelf
      newBooksOnShelf = this.state.books.filter(bk => book.id !== bk.id)
      newBooksOnShelf.push(book)
      this.setState({books: newBooksOnShelf})
    })
    //this corrected function keeps the state of books (thus the 'shelf') at
    //App.js level. It is passed down as a props to ShelfChanger and called there
    //when the user clicks.
  }

  componentDidMount() {
  BooksAPI.getAll().then(array => {
    this.setState({
      books: array
    });
  });
}//componentDidMount

  render() {
    return (
      <div className="app">

        <Route
          path="/search"
          render={() =>(
            <SearchBooks
              appStateBooks = {this.state.books}
              updateState={this.updateState}
            />
          )}/>
        <Route exact path="/" render={() => (
          <div>
              <ListBooks
                books={this.state.books}
                updateState={this.updateState}
                changeShelf={this.changeShelf}
              />
              <div className="open-search">
                <Link to="/search"
                >Add a book</Link>
              </div>
            </div>
        )}/>
      </div>
    )
  }
}
