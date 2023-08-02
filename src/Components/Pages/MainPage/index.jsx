import Header from "../../Atoms/Header";
import ObjectiveList from "../ObjectiveList";
import React, { useEffect } from "react";
import { useSessionContext } from "../../../App";
import { useNavigate } from "react-router-dom";
const MainPage = () => {
  const { session, setSession, clearSession } = useSessionContext();
  const navigate = useNavigate();
  console.log(session, "session");
  useEffect(() => {
    if (session === null) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Header />
      <ObjectiveList />
    </div>
  );
};
export default MainPage;
