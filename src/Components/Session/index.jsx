import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Session = () => {
  const [session, setSession] = useState(null);

  // Load the session from the cookie on component mount
  useEffect(() => {
    const cookieSession = Cookies.get("session");
    if (cookieSession) {
      setSession(cookieSession);
    }
  }, []);

  // Save the session to the cookie whenever it changes
  useEffect(() => {
    if (session) {
      Cookies.set("session", session, { expires: 7 }); // Set an expiration time (in days) or null for a session cookie.
    }
  }, [session]);

  // Function to clear the session
  const clearSession = () => {
    setSession(null);
    Cookies.remove("session");
  };

  return { session, setSession, clearSession };
};

export default Session;
