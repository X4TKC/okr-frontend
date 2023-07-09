import React from "react";
import { useNavigate } from "react-router-dom";
import './index.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'


const ObjectiveDetails = ({ objective }) => {
  const navigate = useNavigate();
  const handleKeyNameClick = () => {
    // Navigate to the page with the information of the key
    navigate(`/key/${objective.keyName}`);
  };
  return (
    <>
    
    <div className="objective-info">
      <div className="arrow-back">
          <ArrowBackIcon onClick={()=> navigate(-1)}></ArrowBackIcon>
      </div>
  
      <h2>Objective Details</h2>
      <h3>{objective.title}</h3>
      <div className="description">
        <p>{objective.description}</p>
      </div>
      <div className="key-section">
          <p className="key-name"
            onClick={handleKeyNameClick}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Key Name: {objective.keyName}
          </p>
          <button onClick={()=> navigate("/add-keyresult")}>Add new Key +</button>
      </div>
      
      <p>Date: {objective.date}</p>
    </div>
    </>
  );
};

export default ObjectiveDetails;
