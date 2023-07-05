import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
const AddMeasurement = () => {
  const [measurement, setMeasurement] = useState("");

  const handleMeasurementChange = (event) => {
    setMeasurement(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any additional validation or processing here
    // For this example, we'll just log the values to the console
    console.log("Measurement:", measurement);

    // Clear the form fields after submitting
    setMeasurement("");
  };

  return (
    <div>
      <div className="auth-form-container">
        <h2>New Measurement</h2>
        <div className="auth-form-container">
          <label htmlFor="name">4. Set Measurements:</label>
          <small>
            Determine how you will track your progress for each key result. For
            example: Track body fat percentage monthly using a body composition
            analysis method. Monitor distance, time, and heart rate during
            cardio sessions to measure improvements in cardiovascular endurance.
            Keep a record of the weight and repetitions for strength training
            exercises to track progress. Set specific flexibility goals (e.g.,
            touching toes, performing a full split) and track your progress over
            time.
          </small>
        </div>
        <form className="objective-form" onSubmit={handleSubmit}>
          <label htmlFor="measurement">Measurement</label>
          <br />
          <input
            value={measurement}
            onChange={handleMeasurementChange}
            type="measurement"
            placeholder="e.g.,
            touching toes, performing a full split"
            id="measurement"
            name="measurement"
          ></input>
          <br />
        </form>
        <button type="submit">Add measurement</button>
      </div>
    </div>
  );
};

export default AddMeasurement;
