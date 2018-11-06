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

  updateState(){
    //this is a callback function that triggers the componentDidUpdate below
    //I sent this function as a prop all the way down, then called it to trigger the component update
    //this is coding Horror, but I don't know how to get out of it. Do you suggest anything?
  }

  componentDidUpdate() {
    BooksAPI.getAll().then(array => {
      this.setState({
        books: array
      });
    });
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
                updateState={this.updateState}
            />
          )}/>
        <Route exact path="/" render={() => (
          <div>
              <ListBooks
                books={this.state.books}
                updateState={this.updateState}
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
