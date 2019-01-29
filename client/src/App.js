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

  removeBook = id => {
    //need to change this to mongoose id instead, as well as get mongoose db to render page
    console.log(id)
    console.log(this.state.books[0].industryIdentifiers[0].identifier)
    const books = this.state.books.filter(book => book.industryIdentifiers[0].identifier !== id);
    console.log(this.state.books.filter(book => book.id !== id))
    console.log(this.state.books)
    API.deleteBook(id);
    this.setState({ books : books });
  };

  saveBook = id => {
    //put it in mongo database
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getBooks(this.state.bookSearch).then(res => {
      var newArr= []
      for (var i=0; i< res.data.items.length; i++){
        newArr.push(res.data.items[i].volumeInfo)
      }
      this.setState({ books: newArr })
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
                        key={book.title}
                        id={book.industryIdentifiers[0].identifier}
                        removeBook={this.removeBook}
                        title={book.title}
                        authors={book.authors.join(", ")}
                        href={book.infoLink}
                        description={book.description}
                        thumbnail={book.imageLinks.smallThumbnail}
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

