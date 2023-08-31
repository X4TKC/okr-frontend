import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import AuthDetails from "../../Auth/AuthDetails";
import LanguageSelector from "../../Utils/LanguageSelector";
import { useTranslation } from "react-i18next"; // Import useTranslation

const Header = () => {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              {t("headerHomeLink")} {/* Use the translated home link */}
            </Link>
          </li>
          <LanguageSelector />
          <AuthDetails />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
