import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment-timezone";
const KeyDetails = ({ keyInfo }) => {
  const dateObject = moment(keyInfo.date).toDate();
  return (
    <div className="auth-form-container">
      <h2>Key Details</h2>
      <h3>{keyInfo.name}</h3>

      {keyInfo.descriptions.map((description, index) => (
        <p key={index}>{description}</p>
      ))}
      <p>Date: {keyInfo.date}</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Calendar value={dateObject} />
      </div>
    </div>
  );
};

export default KeyDetails;
