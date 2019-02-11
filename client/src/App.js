import React, { Component } from "react"
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
import { BookList, BookListItem } from "./components/BookList";
import { SavedBookList, SavedBookListItem } from "./components/SavedBookList";
import { Container, Row, Col } from "./components/Grid";

class App extends Component {
  state = {
    books: [],
    savedBooks: [],
    bookSearch: ""
  }

  componentDidMount() {
    API.getAllBooks()
      .then(res => {
        this.setState({ books: res.data })
      })
      .catch(err => console.log(err))
  }

  removeBook = id => {
    API.deleteBook(id).then(() => {
      API.getAllBooks()
        .then(res => {
          this.setState({ books: res.data })
        })
        .catch(err => console.log(err))
    })
  }

  removeSavedBook = id => {
    API.deleteSavedBook(id).then(() => {
      API.getAllSavedBooks().then((res) => {
        this.setState({ savedBooks: res.data, books: [] })
      })
        .catch(err => console.log(err))
    })
  }

  deleteAllSaved = () => {
    API.deleteSaved()
      .then(() => {
        alert("All saved books deleted!")
      }).then(() => {
        API.getAllSavedBooks().then((res) => {
          this.setState({ savedBooks: res.data, books: [] })
        })
      })
      .catch(err => console.log(err))
  }
  saveBook = id => {
    API.saveBook(id)
      .then(() => {
        API.getAllSavedBooks().then((res) => {
          this.setState({ savedBooks: res.data, books: [] })
        })
      })
      .catch(err => console.log(err))
  }

  displaySaved = () => {
    API.getAllSavedBooks().then((res) => {
      this.setState({ savedBooks: res.data, books: [] })
    })
      .catch(err => console.log(err))
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = event => {
    event.preventDefault()
    API.getBooks(this.state.bookSearch).then(res => {
      this.setState({ books: res.data })
    })
  }

  render() {
    return (
      <div>
        <Nav displaySaved={this.displaySaved}
          deleteAllSaved={this.deleteAllSaved}
        />
        <Jumbotron />
        <Container>
          <Row>
            <Col size="md-12">
              <form>
                <Container>
                  <Row>
                    <Col size="xs-9 sm-10">
                      <Input
                        name="bookSearch"
                        value={this.state.bookSearch}
                        onChange={this.handleInputChange}
                        placeholder="Search For a Book"
                      />
                    </Col>
                    <Col size="xs-3 sm-2">
                      <Button
                        onClick={this.handleFormSubmit}
                        type="success"
                        className="input-lg"
                      >
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </form>
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">
              <br></br>
              {this.state.books.length ?
                (
                  <BookList>
                    {this.state.books.map(book => {
                      return (
                        <BookListItem
                          key={book._id}
                          id={book._id}
                          removeBook={this.removeBook}
                          saveBook={this.saveBook}
                          title={book.title}
                          authors={book.authors}
                          href={book.infoLink}
                          description={book.description}
                          thumbnail={book.image}
                        />
                      )
                    })}
                  </BookList>
                ) : null}
              {this.state.savedBooks.length ?
                (
                  <SavedBookList>
                    {this.state.savedBooks.map(savedBook => {
                      return (
                        <SavedBookListItem
                          key={savedBook._id}
                          id={savedBook._id}
                          removeSavedBook={this.removeSavedBook}
                          title={savedBook.title}
                          authors={savedBook.authors}
                          href={savedBook.infoLink}
                          description={savedBook.description}
                          thumbnail={savedBook.image}
                        />
                      )
                    })}
                  </SavedBookList>
                ) : null}
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App

