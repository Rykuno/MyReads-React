import React, { Component } from 'react';
import propTypes from 'prop-types';

import Book from './Book';

class Bookshelf extends Component {
  renderBooks = () => {
    let { books } = this.props;
    const { changeShelf, shelf } = this.props;

    books = books.filter(book => book.shelf === shelf);
    return books.map((book) => (
      <li key={book.id}>
        <Book
          book={book}
          changeShelf={(toShelf, bookToMove) => {
            changeShelf(toShelf, bookToMove);
          }}
        />
      </li>
    ));
  };

  render() {
    const { title } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <ol className="books-grid">{this.renderBooks()}</ol>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  books: propTypes.arrayOf(propTypes.shape).isRequired,
  title: propTypes.string.isRequired,
  changeShelf: propTypes.func.isRequired,
  shelf: propTypes.string.isRequired
};

export default Bookshelf;
