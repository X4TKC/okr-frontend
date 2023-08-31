import React, { useState } from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./index.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../Services/userService";
import { useSessionContext } from "../../../App";
import { useTranslation } from "react-i18next"; // Import useTranslation
import HeaderLogin from "../../Atoms/HeaderLogin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Signup = (props) => {
  const { t } = useTranslation(); // Initialize the translation hook

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
  const { session, setSession, clearSession } = useSessionContext();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, pass)
      .then((useCredential) => {
        console.log(useCredential);
        navigate("/");
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

    mutation.mutate({
      name: name,
      password: pass,
      email: email,
    });
  };

  return (
    <div>
      {" "}
      <HeaderLogin />
      <div className="auth-form-container">
        <h2>{t("signupTitle")}</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="name">{t("signupUsernameLabel")}</label>
          <input
            value={name}
            className="input-signup"
            onChange={(e) => setName(e.target.value)}
            name="name"
            id="name"
            placeholder={t("signupUsernamePlaceholder")}
          />
          <label htmlFor="email">{t("signupEmailLabel")}</label>
          <input
            value={email}
            className="input-signup"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={t("signupEmailPlaceholder")}
            id="email"
            name="email"
          ></input>
          <label htmlFor="password">{t("signupPasswordLabel")}</label>
          <input
            value={pass}
            className="input-signup"
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder={t("signupPasswordPlaceholder")}
            id="password"
            name="password"
          ></input>
          <button className="button" type="submit">
            {t("signupButton")}
          </button>
        </form>
        <button className="link-btn" onClick={() => navigate("/login")}>
          {t("signupAlreadyHaveAccount")}
        </button>
      </div>
    </div>
  );
};
