import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import alert from 'sweetalert';
import propTypes from 'prop-types';

import * as BooksAPI from '../utils/BooksAPI';
import Book from './Book';

class SearchPage extends Component {
  state = {
    noResults: false,
    query: '',
    books: []
  };

  getBooksForSearch = () => {
    BooksAPI.search(this.state.query)
      .then(books => {
        if (books.error) {
          this.setState({
            noResults: true,
            books: []
          });
        } else {
          this.setState({
            books,
            noResults: false
          });
        }
      })
      .catch(e => {
        alert(e);
      });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      query: e.target.value
    });

    if (this.state.query.length > 1) {
      this.getBooksForSearch();
    }
  };

  createBooks = () => {
    const { books } = this.state;
    const { readingList } = this.props;

    if (books.length > 0) {
      return books.map((book) => (
        <li key={book.id}>
          <Book
            readingList={readingList}
            book={book}
            changeShelf={(toShelf, bookToMove) => {
              this.props.changeShelf(toShelf, bookToMove);
            }}
          />
        </li>
      ));
    }
    return null;
  };

  noResults = () => {
    if (this.state.noResults === true && this.state.query.length > 0) {
      return (
        <div className="no-results">
          <h2>No Results for &apos;{this.state.query}&apos;</h2>
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.noResults()}
          <ol className="books-grid">{this.createBooks()}</ol>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  readingList: propTypes.arrayOf(propTypes.object),
  changeShelf: propTypes.func.isRequired
};

SearchPage.defaultProps = {
  readingList: []
};

export default SearchPage;
