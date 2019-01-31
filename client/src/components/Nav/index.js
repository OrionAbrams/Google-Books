import React from "react";
import "./style.css";

const Nav = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand btn btn-link" href="/">
        Search for Books
      </a>
     <button onClick={() => props.displaySaved()} className="navbar-brand btn btn-link">
        Saved Books
      </button>
      <button onClick={() => props.deleteAllSaved()} className="navbar-brand btn btn-link">
        Delete all Saved Books
      </button>
    </nav>
  );
}


export default Nav;
