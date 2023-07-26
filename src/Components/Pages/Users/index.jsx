import { useEffect, useState } from "react";
import { getUserById } from "../../../Services/userService";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const [idk, setIdk] = useState([]);

  useEffect(() => {
    const asyncFn = async () => {
      setIdk(await getUserById("user_1"));
    };
    asyncFn();
  }, []);
  return (
    <div>
      <p>a</p>
      <p>{idk.id}</p>

      <p>{idk.email}</p>
    </div>
  );
};
