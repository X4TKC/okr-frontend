import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKeytById, updateKey } from "../../../Services/keyService";

const AddAction = () => {
  const [action, setAction] = useState("");
  const queryClient = useQueryClient();
  const urlParam = useParams();
  const navigate = useNavigate();

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const mutation = useMutation({
    mutationFn: updateKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AddAction"] });
    },
  });

  const { data, isSuccess } = useQuery({
    queryKey: ["keyInfo"],
    queryFn: () => getKeytById(urlParam.keyId),
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    mutation.mutate({
      id: data?.data.id,
      description: data?.data.description,
      objectiveId: data?.data.objectiveId,
      action: action,
      measurement: data?.data.measurement,
      check: data?.data.check,
    });

    setAction("");
    navigate(`/key-details/${urlParam.keyId}`);
  };

  return (
    <div>
      <div className="auth-form-container-add-action">
        <ArrowBackIcon onClick={() => navigate(-1)}></ArrowBackIcon>
        <h2 className="section-title">Defining the Key Action</h2>
        <div className="instructions definition">
          <label className="instruction-label" htmlFor="keyresult">
            Remember to:
          </label>
          <h3 className="instruction-text" htmlFor="action">
            Identify the actions you need to take to achieve each key result.
          </h3>
        </div>
        <div className="instructions definition">
          <label className="instruction-label">For example:</label>
          <ul className="instruction-text">
            <li className="keyresult-details-remember-to">
              Follow a balanced diet and engage in regular physical activity to
              reduce body fat percentage.
            </li>
            <li className="keyresult-details-remember-to">
              Engage in aerobic exercises (running, cycling, swimming) for at
              least 30 minutes, five times a week to increase cardiovascular
              endurance.
            </li>
            <li className="keyresult-details-remember-to">
              Incorporate strength training exercises into your routine to
              improve strength and muscle tone.
            </li>
            <li className="keyresult-details-remember-to">
              Include regular stretching exercises and mobility drills to
              enhance flexibility and mobility.
            </li>
          </ul>
        </div>
        <form className="objective-form" onSubmit={handleSubmit}>
          <input
            className="input-action-defining "
            value={action}
            onChange={handleActionChange}
            type="text"
            placeholder="Action"
            id="action"
          ></input>
          <br />
          <button className="add-action-button" type="submit">
            Add Action
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAction;
