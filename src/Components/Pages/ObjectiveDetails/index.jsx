import React from "react";
import { useNavigate } from "react-router-dom";

const ObjectiveDetails = ({ objective }) => {
  const navigate = useNavigate();
  const handleKeyNameClick = () => {
    // Navigate to the page with the information of the key
    navigate(`/key/${objective.keyName}`);
  };
  return (
    <div>
      <h2>Objective Details</h2>
      <h3>{objective.title}</h3>
      <p>{objective.description}</p>
      <p
        onClick={handleKeyNameClick}
        style={{ cursor: "pointer", color: "blue" }}
      >
        Key Name: {objective.keyName}
      </p>
      <p>Date: {objective.date}</p>
    </div>
  );
};

export default ObjectiveDetails;
