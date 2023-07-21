import React, { useState } from "react";
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { getUserByEmail } from "../../../Services/userService";
import { useQuery } from "@tanstack/react-query";
import { useSessionContext } from "../../../App";
export const Login = (props) => {
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
        console.log(useCredential);
        setSession(data?.id);
        {
          isError && <p>User not found</p>;
        }
        {
          isLoading && <p>Loading</p>;
        }
        {
          isSuccess && navigate(`/objectives`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        ></input>
        <label htmlFor="password">password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="*******"
          id="password"
          name="password"
        ></input>
        <button type="submit">Log In</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("signup")}>
        Don't have an account? Register here.
      </button>
    </div>
  );
};
