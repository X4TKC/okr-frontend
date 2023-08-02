import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Session = () => {
  const [session, setSession] = useState(() => {
    // Initialize the session from cookies on component mount
    const cookieSession = Cookies.get("session");
    return cookieSession || null;
  });

  // Save the session to cookies and local storage whenever it changes
  useEffect(() => {
    if (session) {
      Cookies.set("session", session, { expires: 7 }); // Set an expiration time (in days) for the cookie
      localStorage.setItem("session", session); // Save to local storage as well
    } else {
      Cookies.remove("session");
      localStorage.removeItem("session");
    }
  }, [session]);

  // Function to clear the session
  const clearSession = () => {
    setSession(null);
  };

  return { session, setSession, clearSession };
};

export default Session;
