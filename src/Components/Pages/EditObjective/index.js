import React, { useState, useEffect } from 'react';

const EditObjectiveForm = ({ objective, onSave, onDelete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keyName, setKeyName] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    // Update the form fields with the objective values when it changes
    setTitle(objective.title);
    setDescription(objective.description);
    setKeyName(objective.keyName);
    setDate(objective.date);
  }, [objective]);

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

  const confirmSave = window.confirm('Are you sure you want to save changes to this objective?');
  if (confirmSave) {
    // Create an updated objective object
    const updatedObjective = {
      ...objective,
      title,
      description,
      keyName,
      date
    };

    // Call the onSave callback with the updated objective
    onSave(updatedObjective);
  }
};

const handleDelete = () => {
  const confirmDelete = window.confirm('Are you sure you want to delete this objective?');
  if (confirmDelete) {
    // Call the onDelete callback with the objective ID or any other identifier
    onDelete(objective.id);
  }
};
  

  return (
    <div className="auth-form-container">
        <h2>Edit Objective</h2>
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
      <button type="submit">Save Changes</button>
      <button type="button" onClick={handleDelete}>Delete Objective</button>
    </form>
    </div>
  );
};

export default EditObjectiveForm;