import React, { Component } from 'react';
import propTypes from 'prop-types';

class Book extends Component {
  /**
   * Returns Author(s) for book
   */
  getAuthors = () => {
    const { book } = this.props;

    // Check if there is an author
    if (!Object.prototype.hasOwnProperty.call(book, 'authors')) {
      return 'No Author';
    }
    return book.authors.join(', ');
  };

  /**
   * Returns URL for book
   */
  getUrl = () => {
    const { book } = this.props;

    if (!Object.prototype.hasOwnProperty.call(book, 'imageLinks')) {
      return '../icons/noImageAvailable.jpg';
    }
    return book.imageLinks.thumbnail;
  };

  /**
   * Returns title for book.
   */
  getTitle = () => {
    const { book } = this.props;

    // Check if there is an author
    if (!Object.prototype.hasOwnProperty.call(book, 'title')) {
      return 'No Title';
    }
    return book.title;
  };

  /**
   * Returns shelf for book.
   */
  getShelf = () => {
    // Check if the Book is already on a shelf
    const { readingList, book } = this.props;
  
    if (readingList) {
      const foundBook = readingList.filter(obj => obj.id === book.id);

      if (foundBook.length > 0) {
        return foundBook[0].shelf;
      }
    }

    // Check if the property exists, if not assign to 'noShelf'
    if (!Object.prototype.hasOwnProperty.call(book, 'shelf')) {
      return 'noShelf';
    }
    return this.props.book.shelf;
  };

  /**
   * Handles action for changing shelves.
   */
  handleSubmit = (e) => {
    e.preventDefault();
    const shelf = this.props.book.shelf || 'none';
    if (shelf !== e.target.value) {
      this.props.changeShelf(e.target.value, this.props.book);
    }
  };

  /**
   * If a Book is selected, open its info in another tab.
   */
  openInfoTab = () => {
    const { infoLink } = this.props.book;
    window.open(infoLink, '_blank');
  };

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            onClick={this.openInfoTab}
            className="book-cover"
            role="presentation"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.getUrl()})`
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={this.handleSubmit} value={this.getShelf()}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading"> Currently Reading </option>
              <option value="wantToRead"> Want to Read </option>
              <option value="read"> Read </option>
              <option value="noShelf"> None </option>
            </select>
          </div>
        </div>
        <div className="book-title"> {this.getTitle()} </div>
        <div className="book-authors"> {this.getAuthors()} </div>
      </div>
    );
  }
}

Book.propTypes = {
  book: propTypes.shape({
    infoLink: propTypes.string,
    shelf: propTypes.string,
    imageLinks: propTypes.shape({
      thumbnail: propTypes.string
    })
  }).isRequired,
  changeShelf: propTypes.func.isRequired,
  readingList: propTypes.arrayOf(propTypes.shape)
};

Book.defaultProps = {
  readingList: []
};

export default Book;
