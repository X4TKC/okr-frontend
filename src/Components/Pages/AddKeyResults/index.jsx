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
  const [isSubmitting, setIsSubmitting] = useState(false); // Track the submission state
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
      setIsSubmitting(false); // Reset the submission state
      navigate(`/objective-details/${urlParam.objId}`);
    },
    onError: () => {
      setIsSubmitting(false); // Reset the submission state in case of error
      console.log(keyresult, objId);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Set submission state to true
    mutation.mutate({
      description: keyresult,
      objectiveId: objId,
      action: "",
      measurement: "",
    });
  };

  return (
    <div>
      <div className="auth-form-container">
        <ArrowBackIcon onClick={() => navigate(-1)}></ArrowBackIcon>
        <h2 className="description-text">
          Here we are defining the keys of your objective
        </h2>
        <div className="keyresult-item-details definition-keyresult-details">
          <label className="label-text-keyresult-details" htmlFor="keyresult">
            Remember to:
          </label>
          <h3 className="keyresult-details-remember-to">
            Determine specific and measurable outcomes that will indicate
            progress toward your objective. For example:
          </h3>
          <ul className="keyresult-examples">
            <li className="keyresult-details-remember-to">
              Reduce body fat percentage by 5%
            </li>
            <li className="keyresult-details-remember-to">
              Increase cardiovascular endurance
            </li>
            <li className="keyresult-details-remember-to">
              Improve strength and muscle tone
            </li>
            <li className="keyresult-details-remember-to">
              Enhance flexibility and mobility
            </li>
          </ul>
        </div>

        <form className="objective-form" onSubmit={handleSubmit}>
          <br />
          <input
            className="input-add-keyresult"
            value={keyresult}
            onChange={handleKeyResultChange}
            type="text"
            placeholder="Key Result"
            id="keyresult"
            name="keyresult"
            required
          ></input>
          <br />
          <div>
            <button
              className="add-key-result-button"
              type="submit"
              disabled={isSubmitting} // Disable the button during submission
            >
              {isSubmitting ? "Adding..." : "Add Key Result"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKeyResults;
