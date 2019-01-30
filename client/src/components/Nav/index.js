import React from "react";
import "./style.css";

const Nav = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <button className="navbar-brand btn-info" href="/">
        Search for Books
      </button>
     <button onClick={() => props.displaySaved()} className="navbar-brand btn-info">
        Saved Books
      </button>
      <button onClick={() => props.deleteAllSaved()} className="navbar-brand btn-info">
        Delete all Saved Books
      </button>
    </nav>
  );
}


export default Nav;
