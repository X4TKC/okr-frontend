import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
const AddAction = () => {
  const [action, setAction] = useState("");

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any additional validation or processing here
    // For this example, we'll just log the values to the console
    console.log("Action:", action);

    // Clear the form fields after submitting
    setAction("");
  };

  return (
    <div>
      <div className="auth-form-container">
        <h2>New Action</h2>
        <div className="auth-form-container">
          <label htmlFor="action">
            3. Define Actions: Identify the actions you need to take to achieve
            each key result. For example:
          </label>
          <small>
            Follow a balanced diet and engage in regular physical activity to
            reduce body fat percentage. Engage in aerobic exercises (running,
            cycling, swimming) for at least 30 minutes, five times a week to
            increase cardiovascular endurance. Incorporate strength training
            exercises into your routine to improve strength and muscle tone.
            Include regular stretching exercises and mobility drills to enhance
            flexibility and mobility.
          </small>
        </div>
        <form className="objective-form" onSubmit={handleSubmit}>
          <label htmlFor="action">Action</label>
          <br />
          <input
            value={action}
            onChange={handleActionChange}
            type="action"
            placeholder="action"
            id="action"
            name="action"
          ></input>
          <br />
        </form>
        <button type="submit">Add action</button>
      </div>
    </div>
  );
};

export default AddAction;
