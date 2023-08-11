import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteObjective,
  getObjectiveById,
} from "../../../Services/objectiveService";

const ObjectiveDetails = () => {
  const navigate = useNavigate();
  const urlParam = useParams();

  const handleKeyNameClick = () => {
    // Navigate to the page with the information of the key
    // navigate(`/key/${objective.keyName}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      deleteObjective(urlParam.id);
      navigate(-1);
    }
  };

  const queryClient = useQueryClient();
  const { data, isSuccess } = useQuery({
    queryKey: ["objective"],
    queryFn: () => getObjectiveById(urlParam.id),
  });

  return (
    <div className="objective-info">
      <div className="top-buttons">
        <ArrowBackIcon onClick={() => navigate("/")}></ArrowBackIcon>
        <div className="edit-button">
          <Link
            to={`/edit-objective/${urlParam.id}`}
            className="edit-link-button"
          >
            Edit
          </Link>
        </div>
        <div>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </div>
      </div>
      <h2 className="description-text">Objective Details</h2>
      <div className="objective-item-details definition-details-objective">
        <label className="label-text-details">Remember that:</label>
        <h3 className="objective-details-remember-to">
          Each Key result has two important attributes: action and measurement.
          Don't forget to add those.
        </h3>
      </div>
      <div className="objective-details">
        <h2 className="objective-details-title">{data?.data.name}</h2>
        <div className="key-section">
          {isSuccess &&
          data?.data.keyResultList &&
          data?.data.keyResultList.length > 0 ? (
            data?.data.keyResultList.map((keyItem) => (
              <div key={keyItem.id}>
                <div
                  className="keyresult-description-details"
                  onClick={handleKeyNameClick}
                >
                  <p>{keyItem.description}</p>
                  <button
                    className="add-key-result-button"
                    onClick={() => navigate(`/key-details/${keyItem.id}`)}
                  >
                    See Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-keyresults-text">
              No Key Results available for this objective. Please add as many as
              needed. <br></br>
              <br></br>
              <div>
                <img src={require("../../Images/key.png")} />
                <br />
                <h3 className="instructions-h3-title">
                  This section is where all your Key Results will appear.
                </h3>

                <h3 className="instructions-h3-title">
                  Add new Key Results using the Add New Key Result button!
                </h3>
              </div>
            </p>
          )}
        </div>
        <button
          className="add-key-result-button"
          onClick={() => navigate(`/add-keyresult/${urlParam.id}`)}
        >
          Add New Key Result
        </button>
      </div>
    </div>
  );
};

export default ObjectiveDetails;
