import React, { Component } from 'react';

class Book extends Component {
    getURL = () => {
        const url = this.props.book.imageLinks.thumbnail;
        return `url${url}`
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.props.book.shelf !== e.target.value) {
            this.props.changeShelf(e.target.value, this.props.book);
        }
      }

    render() {
        const { title, shelf} = this.props.book;
        const author = this.props.book.authors.join(', ');
        const url = this.props.book.imageLinks.thumbnail;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={this.handleSubmit} value={shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{title}</div>
                          <div className="book-authors">{author}</div>
                        </div>
        )
    }
}

export default Book;