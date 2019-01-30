import React, { Component } from "react";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import Input from "./components/Input";
import Button from "./components/Button";
import API from "./utils/API";
import { BookList, BookListItem } from "./components/BookList";
import { Container, Row, Col } from "./components/Grid";

class App extends Component {
  state = {
    books: [],
    bookSearch: ""
  };

  componentDidMount(){
    API.getAllBooks()
    .then(res => {
      console.log(res.data)
      this.setState({ books: res.data })
    })
  }
  removeBook = id => {
    API.deleteBook(id).then(() => {
      API.getAllBooks()
    .then(res => {
      console.log(res.data)
      this.setState({ books: res.data })
    })
    .catch(err => console.log(err));
    });
  };

  saveBook = id => {
    API.saveBook(id)
    // .then((data) => {
    //   API.getAllSavedBooks()
    .then(res => {
      API.getAllSavedBooks().then((res) => {
        console.log(res.data)
        this.setState({ books: res.data })
      })
      
    })
    .catch(err => console.log(err));
    // });
  };

  displaySaved = id => {
    API.getAllSavedBooks()
    // .then((data) => {
    //   API.getAllSavedBooks()
    .then(res => {
      console.log(res.data)
      this.setState({ books: res.data })
    })
    .catch(err => console.log(err));
    // });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  handleFormSubmit = event => {
    event.preventDefault();
    API.getBooks(this.state.bookSearch).then(res => {
      console.log(res)
      this.setState({ books: res.data })
    })
  };

  render() {
    return (
      <div>
        <Nav />
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
              {!this.state.books.length ? (
                <h1 className="text-center">No Books to Display</h1>
              ) : (
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
                      );
                    })}
                  </BookList>
                )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;

