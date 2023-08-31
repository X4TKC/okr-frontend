import React, { useState } from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { getUserByEmail } from "../../../Services/userService";
import { useQuery } from "@tanstack/react-query";
import { useSessionContext } from "../../../App";
import { useTranslation } from "react-i18next"; // Import useTranslation
import HeaderLogin from "../../Atoms/HeaderLogin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Add this line

export const Login = (props) => {
  const { t } = useTranslation(); // Initialize the translation hook
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const { session, setSession } = useSessionContext();
  const navigate = useNavigate();
  const { data, isSuccess, isFetching, isLoading, isError } = useQuery({
    queryKey: ["User"],
    queryFn: () => getUserByEmail(email),
    enabled: !!email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then((useCredential) => {
        setSession(data?.id);

        if (isError) {
          <p>{t("loginUserNotFound")}</p>;
        }

        if (isLoading) {
          console.log("loading");
          <p>{t("loginLoading")}</p>;
        }

        if (isSuccess) {
          navigate(`/`);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error: " + error.message, {
          position: "top-right",
          autoClose: 5000, // Close the notification after 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <div>
      {" "}
      <HeaderLogin />
      <div className="auth-form-container">
        <h2>{t("loginTitle")}</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">{t("loginEmailLabel")}</label>
          <input
            className="input-login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={t("loginEmailPlaceholder")}
            id="email"
            name="email"
          ></input>
          <label htmlFor="password">{t("loginPasswordLabel")}</label>
          <input
            className="input-login"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder={t("loginPasswordPlaceholder")}
            id="password"
            name="password"
          ></input>
          <button className="button" type="submit">
            {t("loginButton")}
          </button>
        </form>
        <button className="link-btn" onClick={() => navigate("/signup")}>
          {t("loginRegisterLink")}
        </button>
      </div>
    </div>
  );
};
