import React from 'react';
import sortBy from 'sort-by';
import { Route } from 'react-router-dom';
import alert from 'sweetalert';

import Bookshelf from './Bookshelf';
import Header from './Header';
import Search from './Search';
import * as BooksAPI from '../utils/BooksAPI';
import SearchPage from './SearchPage';
import '../css/App.css';


class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentWillMount() {
    BooksAPI.getAll()
      .then(books => {
        this.sortBooks(books);
      })
      .catch(e => {
        alert(e);
      });
  }

  /**
   * Sort books based on their shelf and set the state.
   */
  sortBooks = (books) => {
    books.sort(sortBy('title'));
    this.setState(() => ({
      books
    }));
  };

  /**
   * Changes the book from one shelf to another
   */
  changeShelf = (toShelf, book) => {
    const { books } = this.state;

    // Locate the book and change the shelf
    const bookIndex = books.findIndex(obj => obj.id === book.id);
    const foundBook = books[bookIndex];
    foundBook.shelf = toShelf;

    // Update API to reflect updates.
    BooksAPI.update(foundBook, toShelf)
      .then(() => {
        this.setState(() => ({
          books,
        }));
      })
      .catch(() => {
        alert('Unable to Change Shelf');
      });
  };

  /**
   * Add Book to shelf
   */
  addBook = (toShelf, book) => {
    BooksAPI.update(book, toShelf)
      .then(() => {
        const bookToReassign = book;
        bookToReassign.shelf = toShelf;
        this.setState(state => ({
          books: state.books.concat(bookToReassign)
        }));
      })
      .catch(e => {
        alert(e);
      });
  };

  render() {
    const { books } = this.state;

    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <Header />
              <Bookshelf
                books={books}
                title="Currently Reading"
                shelf="currentlyReading"
                changeShelf={(toShelf, book) => {
                  this.changeShelf(toShelf, book);
                }}
              />
              <Bookshelf
                books={books}
                title="Want To Read"
                shelf="wantToRead"
                changeShelf={(toShelf, book) => {
                  this.changeShelf(toShelf, book);
                }}
              />
              <Bookshelf
                books={books}
                title="Read"
                shelf="read"
                changeShelf={(toShelf, book) => {
                  this.changeShelf(toShelf, book);
                }}
              />
              <Search />
            </div>
          )}
        />

        <Route
          path="/search"
          render={() => (
            <SearchPage
              readingList={this.state.books}
              changeShelf={(toShelf, book) => {
                this.addBook(toShelf, book);
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
