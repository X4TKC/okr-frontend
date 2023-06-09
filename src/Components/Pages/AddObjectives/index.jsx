import React, { useState } from "react";

const ObjectiveForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyName, setKeyName] = useState("");
  const [date, setDate] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleKeyNameChange = (event) => {
    setKeyName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any additional validation or processing here
    // For this example, we'll just log the values to the console
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Key Name:", keyName);
    console.log("Date:", date);

    // Clear the form fields after submitting
    setTitle("");
    setDescription("");
    setKeyName("");
    setDate("");
  };

  return (
    <div className="auth-form-container">
      <h2>New Objective</h2>
      <form className="objective-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          value={title}
          onChange={handleTitleChange}
          type="title"
          placeholder="title"
          id="title"
          name="title"
        ></input>
        <br />
        <label htmlFor="description">Description</label>
        <br />
        <input
          value={description}
          onChange={handleDescriptionChange}
          type="description"
          placeholder="description"
          id="description"
          name="description"
        ></input>
        <br />
        <label htmlFor="keyName">Key Name</label>
        <br />
        <input
          value={keyName}
          onChange={handleKeyNameChange}
          type="keyName"
          placeholder="Key Name"
          id="keyName"
          name="keyName"
        ></input>
        <br />
        <label htmlFor="date">Date</label>
        <br />
        <input
          value={date}
          onChange={handleDateChange}
          type="date"
          placeholder="Date"
          id="date"
          name="date"
        ></input>
        <br />
      </form>
      <button type="submit">Add Objective</button>
    </div>
  );
};

export default ObjectiveForm;
