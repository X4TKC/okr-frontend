import React, { useState } from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./index.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../Services/userService";
import { useSessionContext } from "../../../App";
export const Signup = (props) => {
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
    console.log(email);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((useCredential) => {
        console.log(useCredential);

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    mutation.mutate({
      name: name,
      password: pass,
      email: email,
    });
  };
  return (
    <div className="auth-form-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Username</label>
        <input
          value={name}
          className="input-signup"
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
          placeholder="yourusername"
        />
        <label htmlFor="email">Email</label>
        <input
          value={email}
          className="input-signup"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          className="input-signup"
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="*******"
          id="password"
          name="password"
        ></input>
        <button className="button" type="submit">
          Sign In
        </button>
      </form>
      <button className="link-btn" onClick={() => navigate("/login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};
