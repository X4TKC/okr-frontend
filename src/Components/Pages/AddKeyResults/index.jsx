import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./index.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddKey } from "../../../Services/keyService";

const AddKeyResults = () => {
  const [keyresult, setKeyResult] = useState("");
  const [objId, setObjId] = useState("");
  const urlParam = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleKeyResultChange = (event) => {
    setKeyResult(event.target.value);
  };

  useEffect(() => {
    setObjId(urlParam.objId);
  }, []);

  const mutation = useMutation({
    mutationFn: AddKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addKey"] });
    },
    onError: () => {
      console.log(keyresult, objId);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("KeyResult:", keyresult);

    mutation.mutate({
      description: keyresult,
      objectiveId: objId,
      action: "",
      measurement: "",
    });

    // Clear the form fields after submitting
    //setKeyResult("");
    navigate(`/objective-details/${objId}`);
  };

  return (
    <div>
      <div className="auth-form-container">
        <ArrowBackIcon onClick={() => navigate(-1)}></ArrowBackIcon>
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
            type="text"
            placeholder="Reduce body fat
            percentage by 5%"
            id="keyresult"
            name="keyresult"
          ></input>
          <br />
          <div>
            <button type="submit">Add key result</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKeyResults;
