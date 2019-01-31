import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";

// RecipeList renders a bootstrap list item
export function SavedBookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

// RecipeListItem renders a bootstrap list item containing data from the recipe api call
export function SavedBookListItem(props) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={props.thumbnail || "https://placehold.it/300x300"} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{props.title}</h3>
            <p>Authors: {props.authors.split(",").join(", ")}</p>
            <p>Synopsis: {props.description}</p>
            <a rel="noreferrer noopener" target="_blank" href={props.href}>
              More book information at Google Books!
            </a>
            <button onClick={() => props.removeSavedBook(props.id)} className="remove">
        Delete Saved Book
      </button>
          </Col>
        </Row>
      </Container>
    </li>
  );
}