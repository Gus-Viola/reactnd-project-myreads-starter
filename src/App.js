import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
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
}

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (<SearchBooks /> ) : ( <ListBooks books={this.state.books} updateState={this.updateState} />)}
      </div>
    )
  }
}

export default BooksApp
