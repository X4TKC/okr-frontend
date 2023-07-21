import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useSessionContext } from "../../App";
const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const { session, setSession } = useSessionContext();
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        setSession(null);
        console.log("sign out successful");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {authUser ? (
        <>
          <li>{authUser.email}</li>
          <button className="button" onClick={userSignOut}>{`Sign out`}</button>
        </>
      ) : (
        <li>Signed Out</li>
      )}
    </>
  );
};

export default AuthDetails;
