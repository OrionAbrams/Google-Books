import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";

// Exporting both RecipeList and RecipeListItem from this file

// RecipeList renders a bootstrap list item
export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function BookListItem(props
  
//   {
//   thumbnail = "https://placehold.it/300x300",
//   title,
//   ingredients,
//   href,
//   authors,
//   id
// }
) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={props.thumbnail} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{props.title}</h3>
            <p>Authors: {props.authors}</p>
            <p>Ingredients: {props.description}</p>
            <a rel="noreferrer noopener" target="_blank" href={props.href}>
              More book information at Google Books!
            </a>
            <button onClick={() => props.removeBook(props.id)} className="remove">
        Delete Book
      </button>
      <button onClick={() => props.saveBook(props.id)} className="save">
        Save Book
      </button>
          </Col>
        </Row>
      </Container>
    </li>
  );
}
