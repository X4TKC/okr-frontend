import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import Modal from "../components/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addObjective } from "../../../Services/objectiveService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSessionContext } from "../../../App";
const AddObjective = () => {
  const { session } = useSessionContext();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nextSection, setNextSection] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const urlParam = useParams();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  useEffect(() => {
    setUserId(session);
    console.log("testuser", session);
  }, []);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addObjective,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addObj"] });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // For this example, we'll just log the values to the console
    mutation.mutate({
      name: name,
      keyResultList: [],
      dateStart: startDate,
      dateEnd: endDate,
      userId: session, //TO BE REPLACED WITH GLOBAL FOR USER SESSION
    });

    setName("");
    setEndDate("");
    setStartDate("");

    navigate(`/objectives`);
  };
  return (
    <>
      <div>
        <div className="auth-form-container">
          <ArrowBackIcon onClick={() => navigate(-1)}></ArrowBackIcon>
          <h2>New Objective Title</h2>
          <div className="auth-form-container definition">
            <label htmlFor="name">1. Define your objective:</label>
            <small>
              Clearly state your personal goal. For example, "Improve Physical
              Fitness and Achieve a Healthy Body."
            </small>
          </div>
          <form className="objective-form " onSubmit={handleSubmit}>
            <div>
              <div>
                <input
                  value={name}
                  onChange={handleNameChange}
                  type="name"
                  placeholder="Name"
                  id="name"
                  name="name"
                  required
                ></input>
              </div>

              <div>
                <DatePicker
                  id="startDate"
                  placeholderText="Start Date"
                  selected={startDate}
                  onChange={handleStartDateChange}
                  dateFormat="dd/MM/yyyy"
                  required
                />
              </div>

              <div>
                <DatePicker
                  placeholderText="End Date"
                  id="endDate"
                  selected={endDate}
                  onChange={handleEndDateChange}
                  dateFormat="dd/MM/yyyy"
                  required
                />
              </div>
            </div>
            <div className="m-10 py-10 px-40">
              <button type="submit">Add Objective title</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddObjective;
