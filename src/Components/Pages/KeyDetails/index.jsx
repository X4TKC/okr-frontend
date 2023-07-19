import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment-timezone";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './index.css'
import { useNavigate } from "react-router-dom";

const KeyDetails = ({ keyInfo }) => {
  const dateObject = moment(keyInfo.date).toDate();
  const navigate = useNavigate();
  return (
    <div className="auth-form-container">
        <ArrowBackIcon onClick={()=> navigate(-1)}></ArrowBackIcon>
      <h2>Key Details</h2>
      <h3>{keyInfo.name}</h3>

      {keyInfo.descriptions.map((description, index) => (
        <p key={index}>{description}</p>
      ))}

      <p>Date: {keyInfo.date}</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Calendar value={dateObject} />
      </div>
      <div className="buttons">
        <button onClick={()=> navigate("/add-action")} className="action-button">Add a new action</button>
        <button onClick={()=> navigate("/add-measurement")} className="measurement-button">Add a new measurement</button>
      </div>
    </div>
  );
};

export default KeyDetails;
