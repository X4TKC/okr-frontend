import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getObjectiveById,
  updateObjective,
  deleteObjective,
} from "../../../Services/objectiveService";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./index.css";
const EditObjectiveForm = () => {
  const [name, setName] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const urlParam = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isSuccess, isFetching, isLoading, isError } = useQuery({
    queryKey: ["objectiveEdit"],
    queryFn: () => getObjectiveById(urlParam.id), //USEPARAMS
  });

  const mutation = useMutation({
    mutationFn: updateObjective,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editObj"] });
    },
  });

  useEffect(() => {
    // Update the form fields with the objective values when it changes
    setName(data?.data.name);

    setDateStart(data?.data.dateStart.substring(0, 10));
    setDateEnd(data?.data.dateEnd.substring(0, 10));
  }, [data]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateStartChange = (event) => {
    setDateStart(event.target.value);
  };

  const handleDateEndChange = (event) => {
    setDateEnd(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      window.confirm("Are you sure you want to save changes to this objective?")
    ) {
      mutation.mutate({
        id: urlParam.id,
        name: name,
        dateStart: dateStart,
        dateEnd: dateEnd,
      });
      navigate(-1);
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this objective?"
    );
    if (confirmDelete) {
      deleteObjective(urlParam.id);
      navigate(`/`);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="top-buttons">
        <div className="">
          <ArrowBackIcon onClick={() => navigate(-1)}></ArrowBackIcon>
        </div>
        <div className="right-button">
          <button onClick={handleDelete} className="delete-objective-button">
            Delete
          </button>
        </div>
      </div>
      <h2>Edit Objective</h2>
      <br></br>
      <form className="objective-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>

          <input
            className="input-edit-objective"
            value={name}
            onChange={handleNameChange}
            type="name"
            placeholder="name"
            id="name"
            name="name"
            required
          ></input>
        </div>
        <div className="input-group">
          <label htmlFor="description">Start Date</label>
          <input
            className="input-edit-objective"
            value={dateStart}
            onChange={handleDateStartChange}
            type="date"
            placeholder="Start Date"
            id="startDate"
            name="startDate"
            required
          ></input>
        </div>
        <div className="input-group">
          <label htmlFor="date">End Date</label>

          <input
            className="input-edit-objective"
            value={dateEnd}
            onChange={handleDateEndChange}
            type="date"
            placeholder="End Date"
            id="endDate"
            name="endDate"
            required
          ></input>
        </div>
        <button className="add-objective-button" type="submit">
          Save Changes
        </button>
        <button
          className="cancel-objective-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditObjectiveForm;
