import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment-timezone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import { getKeytById } from "../../../Services/keyService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteKey } from "../../../Services/keyService";
const KeyDetails = ({ keyInfo }) => {
  const navigate = useNavigate();
  const urlParam = useParams();
  const queryClient = useQueryClient();
  const { data, isSuccess, isFetching, isLoading, isError } = useQuery({
    queryKey: ["objective"],
    queryFn: () => getKeytById(urlParam.id),
  });
  const handleDelete = () => {
    if (window.confirm("Are you sure you wish to delete this item?")) {
      deleteKey(urlParam.id);
      navigate(-1);
    }
  };
  return (
    <div className="auth-form-container">
      <ArrowBackIcon
        onClick={() => navigate(`/objective-details/${data.data.objectiveId}`)}
      ></ArrowBackIcon>
      <h2>Here is the details of your key:</h2>
      <div className="name">
        <p>{data?.data.description}</p>

        <div style={{ display: "flex", justifyContent: "center" }}></div>

        {isSuccess && data?.data.action && (
          <div>
            <div className="key-edit-action-measurement">
              <h4>Action:</h4>
              <EditIcon
                onClick={() => navigate(`/edit-action/${data?.data.id}`)}
                className="edit-icon"
              ></EditIcon>
            </div>
            <p> {data?.data.action}</p>
          </div>
        )}
        {isSuccess && !data?.data.action && (
          <div className="buttons">
            <button
              className="button"
              onClick={() => navigate(`/add-action/${data?.data.id}`)}
            >
              Add a new action
            </button>
          </div>
        )}

        {isSuccess && data?.data.measurement && (
          <div>
            <div className="key-edit-action-measurement">
              <h4>Measurement:</h4>
              <EditIcon
                onClick={() => navigate(`/edit-measurement/${data?.data.id}`)}
                className="edit-icon"
              ></EditIcon>
            </div>

            <p> {data?.data.measurement}</p>
          </div>
        )}
        {isSuccess && !data?.data.measurement && (
          <div className="buttons">
            <button
              onClick={() => navigate(`/add-measurement/${data?.data.id}`)}
              className="button"
            >
              Add a new measurement
            </button>
          </div>
        )}
        <button onClick={handleDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default KeyDetails;
