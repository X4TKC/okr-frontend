import React from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../../Scripts/i18n";
import "./index.css";
function LanguageSelector() {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <li className="nav-item-ln">
      <button className="nav-link-ln" onClick={() => changeLanguage("en")}>
        English
      </button>
      <button className="nav-link-ln" onClick={() => changeLanguage("es")}>
        Spanish
      </button>
    </li>
  );
}

export default LanguageSelector;
