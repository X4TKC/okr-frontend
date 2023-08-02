import React from "react";
import { Link } from 'react-router-dom';
import "./index.css";
import AuthDetails from '../../Auth/AuthDetails';
const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
         {/* <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          */ }
          <AuthDetails/>
        </ul>
      </nav>
    </header>
  );
};

export default Header;