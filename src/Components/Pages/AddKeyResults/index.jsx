import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
const AddKeyResults = () => {
  const [keyresult, setKeyResult] = useState("");

  const handleKeyResultChange = (event) => {
    setKeyResult(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any additional validation or processing here
    // For this example, we'll just log the values to the console
    console.log("KeyResult:", keyresult);

    // Clear the form fields after submitting
    setKeyResult("");
  };

  return (
    <div>
      <div className="auth-form-container">
        <h2>New Key Result</h2>
        <div className="auth-form-container">
          <label htmlFor="keyresult">2. Identify Key Results:</label>
          <small>
            Determine specific and measurable outcomes that will indicate
            progress toward your objective. For example: Reduce body fat
            percentage by 5% Increase cardiovascular endurance Improve strength
            and muscle tone Enhance flexibility and mobility
          </small>
        </div>
        <form className="objective-form" onSubmit={handleSubmit}>
          <label htmlFor="keyresult">Name</label>
          <br />
          <input
            value={keyresult}
            onChange={handleKeyResultChange}
            type="keyresult"
            placeholder="Reduce body fat
            percentage by 5%"
            id="keyresult"
            name="keyresult"
          ></input>
          <br />
        </form>
        <button type="submit">Add key result</button>
      </div>
    </div>
  );
};

export default AddKeyResults;
