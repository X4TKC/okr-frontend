import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addObjective } from "../../../Services/objectiveService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSessionContext } from "../../../App";

const AddObjective = () => {
  const { session } = useSessionContext();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const mutation = useMutation({
    mutationFn: addObjective,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addObj"] });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({
      name: name,
      keyResultList: [],
      dateStart: startDate,
      dateEnd: endDate,
      userId: session,
    });
    setName("");
    setEndDate(null);
    setStartDate(null);
    navigate(`/`);
  };

  return (
    <div className="auth-form-container">
      <ArrowBackIcon onClick={() => navigate(-1)} />
      <h2 className="description-text">
        Define your objective and set the target date range for achievement.
      </h2>
      <div className="objective-item definition">
        <label className="label-text">Remember to:</label>
        <h3 className="objective-remember-to">
          Clearly state your personal goal. For example, "Improve Physical
          Fitness and Achieve a Healthy Body."
        </h3>
      </div>
      <form className="objective-form" onSubmit={handleSubmit}>
        <div>
          <input
            className="input-add-objective"
            value={name}
            onChange={handleNameChange}
            type="text"
            placeholder="Name"
            id="name"
            name="name"
            required
          />
          <DatePicker
            className="input-add-objective"
            id="startDate"
            placeholder="Start Date"
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
            required
            autoComplete="off"
          />
          <DatePicker
            className="input-add-objective"
            placeholder="End Date"
            id="endDate"
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
            required
            autoComplete="off"
          />
        </div>
        <div className="m-10 py-10 px-40">
          <button className="add-objective-button" type="submit">
            Add Objective title
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddObjective;
