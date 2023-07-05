import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/objectives">Home</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;