import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddObjective = () => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any additional validation or processing here
    // For this example, we'll just log the values to the console
    console.log("Name:", name);

    // Clear the form fields after submitting
    setName("");
  };

  return (
    <div>
      <div className="auth-form-container">
        <h2>New Objective Title</h2>
        <div className="auth-form-container">
          <label htmlFor="name">1. Define your objective:</label>
          <small>
            Clearly state your personal goal. For example, "Improve Physical
            Fitness and Achieve a Healthy Body."
          </small>
        </div>
        <form className="objective-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            value={name}
            onChange={handleNameChange}
            type="name"
            placeholder="name"
            id="name"
            name="name"
          ></input>
          <br />
          <label htmlFor="startDate">Start Date:</label>
          <DatePicker
            id="startDate"
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
          />

          <label htmlFor="endDate">End Date:</label>
          <DatePicker
            id="endDate"
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
          />
        </form>
        <button type="submit">Add Objective title</button>
      </div>
    </div>
  );
};

export default AddObjective;
