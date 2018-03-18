import React, { Component } from 'react';

class Book extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        let shelf = this.props.book.shelf || 'none';
        if (shelf !== e.target.value) {
            console.log(e.target.value);
            this.props.changeShelf(e.target.value, this.props.book);
        }
      }

      getAuthors = () => {
        let book = this.props.book;

        //Check if there is an author
        if (!book.hasOwnProperty('authors')) {
            return 'No Author';
        }

        return book.authors.join(', ');
      }

      getUrl = () => {
        if (!this.props.book.hasOwnProperty('imageLinks')) {
            return '../icons/noImageAvailable.jpg';
        }
        
        return this.props.book.imageLinks.thumbnail;
      }


      getTitle = () => {
        let book = this.props.book;

        //Check if there is an author
        if (!book.hasOwnProperty('title')) {
            return 'No Title';
        }

        return book.title;
      }

      getShelf = () => {
        let shelf = this.props.book.shelf
        if (!shelf) {shelf = 'none';}

        if (this.props.readingList) {
            let foundBook = this.props.readingList.filter(obj => obj.id === this.props.book.id);
            if (foundBook.length > 0) {
                console.log(foundBook);
                return foundBook[0].shelf;
            }
        }
        return shelf
      }


    openInfoTab = () => {
        const { infoLink } = this.props.book;
        window.open(infoLink, '_blank');
    }

    render() {
        
        return (
            <div className="book">
                <div className="book-top">
                    <div onClick={this.openInfoTab} className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.getUrl()})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={this.handleSubmit} value={this.getShelf()}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{this.getTitle()}</div>
                          <div className="book-authors">{this.getAuthors()}</div>
                        </div>
        )
    }
}

export default Book;