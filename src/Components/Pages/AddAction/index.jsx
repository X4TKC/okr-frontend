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

  const { data, isSuccess, isFetching, isLoading, isError } = useQuery({
    queryKey: ["keyInfo"],
    queryFn: () => getKeytById(urlParam.keyId), //USEPARAMS
  });
  console.log("Data", data);
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
      <div className="auth-form-container">
        <ArrowBackIcon onClick={() => navigate(-1)}></ArrowBackIcon>
        <h2>Here we are defining the "Action" of your key</h2>
        <div className="details-container">
          <label htmlFor="keyresult">Remember to:</label>
          <br></br>
          <h3 htmlFor="action">
            Identify the actions you need to take to achieve each key result.
            For example:
          </h3>
          <br></br>
          <small className="small">
            Follow a balanced diet and engage in regular physical activity to
            reduce body fat percentage. <br></br>Engage in aerobic exercises
            (running, cycling, swimming) for at least 30 minutes, five times a
            week to increase cardiovascular endurance.<br></br> Incorporate
            strength training exercises into your routine to improve strength
            and muscle tone. <br></br>Include regular stretching exercises and
            mobility drills to enhance flexibility and mobility.
          </small>
        </div>
        <form className="objective-form" onSubmit={handleSubmit}>
          <label htmlFor="action">Action</label>
          <br />
          <input
            className="input-action"
            value={action}
            onChange={handleActionChange}
            type="text"
            placeholder="action"
            id="action"
          ></input>
          <br />
          <button className="button" type="submit">
            Add action
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAction;
