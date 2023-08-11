import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { useSessionContext } from "../../App";
const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();
  const { session, setSession, clearSession } = useSessionContext();
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
        clearSession();
        console.log("sign out successful");
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {authUser ? (
        <>
          <button
            className="button-auth"
            onClick={userSignOut}
          >{`Sign out`}</button>
          <li className="email-text">{authUser.email}</li>
        </>
      ) : (
        <li className="email-text">Signed Out</li>
      )}
    </>
  );
};

export default AuthDetails;
