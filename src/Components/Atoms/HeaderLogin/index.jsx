import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import AuthDetails from "../../Auth/AuthDetails";
import LanguageSelector from "../../Utils/LanguageSelector";
import { useTranslation } from "react-i18next"; // Import useTranslation

const HeaderLogin = () => {
  const { t } = useTranslation(); // Initialize the translation hook

  return (
    <header className="">
      <nav>
        <ul className="nav-list">
          <LanguageSelector />
        </ul>
      </nav>
    </header>
  );
};

export default HeaderLogin;
