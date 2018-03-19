import React from 'react';
import '../css/App.css';
import Bookshelf from './Bookshelf';
import Header from './Header';
import Search from './Search';
import * as BooksAPI from '../utils/BooksAPI';
import sortBy from 'sort-by';
import { Route } from 'react-router-dom';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentWillMount() {
    BooksAPI.getAll()
    .then(books => {
      this.sortBooks(books);
    })
    .catch(e => {
      alert(e);
    })
  }

  /**
   * Sort books based on their shelf and set the state.
   */
  sortBooks = (books) => {
      books.sort(sortBy('title'));
      this.setState(state => ({
        books
      }));
  }

  /**
   * Changes the book from one shelf to another
   */
  changeShelf = (toShelf, book) => {
    const books = this.state.books;
    console.log(books);
    
    //Locate the book and change the shelf
    const bookIndex = books.findIndex((obj => obj.id === book.id));    
    const foundBook = books[bookIndex]    
    foundBook.shelf = toShelf;

    //Update API to reflect updates.
    BooksAPI.update(foundBook, toShelf)
    .then(res => {
      this.setState(state => ({
        books: books
      }));
    })
    .catch(e => {
      alert("Unable to Change Shelf");
    })
  }

  /**
   * Add Book to shelf
   */
  addBook = (toShelf, book) => {
    BooksAPI.update(book, toShelf)
    .then(res => {
      book.shelf = toShelf
      this.setState(state => ({
        books: state.books.concat(book)
      }))
    })
    .catch(e => {
      alert(e);
    })
  }

  render() {
    const { books } = this.state;
    
    return (
      <div>
        <Route exact path='/' render={() => (
          <div>
          <Header/>
          <Bookshelf 
            books={books}
            title={'Currently Reading'}
            shelf={'currentlyReading'}
            changeShelf={(toShelf, book) => {
              this.changeShelf(toShelf, book);
          }}/>
          <Bookshelf 
            books={books}
            title={'Want To Read'}
            shelf={'wantToRead'}
            changeShelf={(toShelf, book) => {
              this.changeShelf(toShelf, book);
          }}/>
          <Bookshelf 
            books={books}
            title={'Read'}
            shelf={'read'}
            changeShelf={(toShelf, book) => {
              this.changeShelf(toShelf, book);
          }}/>
          <Search/>
        </div>
        )}></Route>

        <Route path='/search' render={() => (
            <SearchPage
              readingList={this.state.books}
              changeShelf={(toShelf, book) => {
                this.addBook(toShelf, book);
              }}
            />
        )} />
      </div>
    )
  }
}

export default BooksApp
