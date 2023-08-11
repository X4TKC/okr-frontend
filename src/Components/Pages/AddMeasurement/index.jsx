import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKeytById, updateKey } from "../../../Services/keyService";
import "./index.css";

const AddMeasurement = () => {
  const [measurement, setMeasurement] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const urlParam = useParams();

  const handleMeasurementChange = (event) => {
    setMeasurement(event.target.value);
  };

  const mutation = useMutation({
    mutationFn: updateKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AddMeasurement"] });
    },
  });

  const { data, isSuccess, isFetching, isLoading, isError } = useQuery({
    queryKey: ["keyInfo"],
    queryFn: () => getKeytById(urlParam.keyId), //USEPARAMS
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any additional validation or processing here
    // For this example, we'll just log the values to the console

    mutation.mutate({
      id: data?.data.id,
      description: data?.data.description,
      objectiveId: data?.data.objectiveId,
      action: data?.data.action,
      measurement: measurement,
      check: data?.data.check,
    });

    navigate(`/key-details/${urlParam.keyId}`);
    // Clear the form fields after submitting
    setMeasurement("");
  };
  return (
    <div>
      <div className="auth-form-container-add-measurement">
        <ArrowBackIcon onClick={() => navigate(-1)}></ArrowBackIcon>
        <h2 className="section-title">Defining the Key Measurement</h2>
        <div className="instructions definition">
          <label className="instruction-label" htmlFor="keyresult">
            Remember to:
          </label>
          <h3 className="instruction-text" htmlFor="action">
            Determine how you will track your progress for each key result. For
            example:
          </h3>
          <ul className="instruction-list">
            <li className="keyresult-details-remember-to">
              Track body fat percentage monthly using a body composition
              analysis method.
            </li>
            <li className="keyresult-details-remember-to">
              Monitor distance, time, and heart rate during cardio sessions to
              measure improvements in cardiovascular endurance.
            </li>
            <li className="keyresult-details-remember-to">
              Keep a record of the weight and repetitions for strength training
              exercises to track progress.
            </li>
            <li className="keyresult-details-remember-to">
              Set specific flexibility goals (e.g., touching toes, performing a
              full split) and track your progress over time.
            </li>
          </ul>
        </div>
        <form className="objective-form" onSubmit={handleSubmit}>
          <input
            className="input-measurement-defining"
            value={measurement}
            onChange={handleMeasurementChange}
            type="text" /* Corrected attribute value */
            placeholder="Measurement"
            id="measurement"
            name="measurement"
          />
          <br />
          <br></br>

          <button className="add-measurement-button" type="submit">
            Add measurement
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMeasurement;
