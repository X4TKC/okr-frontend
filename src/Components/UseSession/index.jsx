import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useSession = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const cookieSession = Cookies.get("session");
    if (cookieSession) {
      setSession(cookieSession);
    }
  }, []);

  const clearSession = () => {
    setSession(null);
    Cookies.remove("session");
  };

  return { session, setSession, clearSession };
};

export default useSession;
