import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

import FilterMenu from "../FilterMenu";
import './style.css'

function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className="under">
          <li>
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li>
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="under">
          <li className="spacing">
            <Link to="/signup">Signup</Link>
          </li>
          <li className="spacing">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header className="flex-row">
      <div className="logo">
      <h1 className="p-3">
        <Link to="/">
          TEXTOS ANTIGUOS 
        </Link>
      </h1>
</div>

      <nav className="p-3">
          {showNavigation()}
          <FilterMenu />
      </nav>
<div className="credit px-3">
  <p>Developed By<br></br>
 <a href="https://github.com/ditazan">Dita Z.</a> & <a href="https://github.com/jaime-gg">Jaime G.G.</a></p>

</div>
    </header>
  );
}

export default Nav;
