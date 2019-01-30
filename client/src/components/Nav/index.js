import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Search for Books
      </a>
     <a className="navbar-brand" href="/">
        Saved Books
      </a>
    </nav>
  );
}

export default Nav;
