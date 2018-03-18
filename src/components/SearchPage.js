import React, { Component } from 'react';
import * as BooksAPI from '../utils/BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';

class SearchPage extends Component {
    state = {
        noResults: false,
        query: '',
        books: []
    }

    getBooksForSearch = () => {
            BooksAPI.search(this.state.query)
            .then(books => {
                if (books.error) {
                   this.setState({
                       noResults: true
                   })
                }else {
                this.setState({
                    books: books,
                    noResults: false
                })
            }
            })
            .catch(e => {
                alert(e);
            })
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            query: e.target.value.trim()
        });

        if (this.state.query.length > 1) {
            this.getBooksForSearch();
        }
    }


    createBooks = () => {
        if (this.state.books.length > 0) {
            return this.state.books.map((book, index) => (
                <li key={index}>
                    <Book 
                        readingList={this.props.readingList}
                        book={book}
                        changeShelf={(toShelf, book) => {
                            this.props.changeShelf(toShelf, book);
                        }}
                    />  
                </li>
            ))
        }
    }

    noResults = () => {
        if (this.state.noResults === true) {
            return <div className='no-results'><h2>No Results for '{this.state.query}'</h2></div>
        }
    }

    render() {        
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
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
              <ol className="books-grid">
                {this.createBooks()}
              </ol>
            </div>
          </div>
        )
    }
}

export default SearchPage;