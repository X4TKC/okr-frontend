import React, { useState } from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./index.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../../Services/userService";
export const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const queryClient = useQueryClient();
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
        navigate("/objectives");
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
        <label htmlFor="name">Full Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
          placeholder="Full Name"
        />
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
        <button type="submit">Sign In</button>
      </form>
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};
