import React from "react";
import { Link } from 'react-router-dom';
import "./index.css";
import AuthDetails from '../../Auth/AuthDetails';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          {/* Add other navigation links as needed */}
          <AuthDetails />
        </ul>
      </nav>
    </header>
  );
};

export default Header;

