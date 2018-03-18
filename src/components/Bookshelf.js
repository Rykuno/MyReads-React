import React, { Component } from 'react';
import Book from './Book';

class Bookshelf extends Component {

    renderBooks = () => {
        let { books, changeShelf,  shelf} = this.props;
        books = books.filter(book => book.shelf === shelf);
        return books.map((book, index) => (
            <li key={index}>
                <Book 
                    book={book}
                    changeShelf={(toShelf, book) => {
                        changeShelf(toShelf, book);
                    }}
                />
            </li>
        ))
    }

    render() {
        const { title } = this.props;

        return (
            <div className='bookshelf'>
                <h2 className='bookshelf-title'>{title}</h2>
                <ol className='books-grid'>
                    {this.renderBooks()}
                </ol>
            </div>
        )
    }
}

export default Bookshelf;