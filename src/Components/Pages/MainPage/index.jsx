import React, { useEffect, useState } from "react";
import { useSessionContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import Header from "../../Atoms/Header";
import ObjectiveList from "../ObjectiveList";
import Cookies from "js-cookie";
const MainPage = () => {
  const { session, setSession, clearSession } = useSessionContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if session data is available from the cookie
    const cookieSession = Cookies.get("session");
    if (cookieSession) {
      setSession(cookieSession);
    }
    setLoading(false); // Set loading to false after checking session data
  }, [setSession]);

  useEffect(() => {
    // Redirect to login page if there is no session
    if (!session) {
      clearSession();
      navigate("/login");
    }
  }, [session, clearSession, navigate]);

  if (loading) {
    // Render a loading indicator until session data is available
    return <div>Loading...</div>;
  }

  if (!session) {
    // If there is no session, render nothing (you can also show a message or custom content)
    return null;
  }

  return (
    <div>
      <Header />
      <ObjectiveList />
    </div>
  );
};

export default MainPage;
