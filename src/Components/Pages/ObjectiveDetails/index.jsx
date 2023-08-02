import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteObjective,
  getObjectiveById,
} from "../../../Services/objectiveService";
import Header from "../../Atoms/Header";
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

  // Queries
  const { data, isSuccess, isFetching, isLoading, isError } = useQuery({
    queryKey: ["objective"],
    queryFn: () => getObjectiveById(urlParam.id),
  });

  return (
    <div className="">
      <Header />
      <div className="objective-info">
        <div className="top-buttons">
          <ArrowBackIcon onClick={() => navigate("/")}></ArrowBackIcon>
          <div className="edit-button">
            <Link
              to={`/edit-objective/${urlParam.id}`}
              className="edit-link-button"
            >
              Edit{" "}
            </Link>
          </div>
          <div>
            <button onClick={handleDelete} className="delete-button">
              Delete
            </button>
          </div>
        </div>
        <h2>Here is the details of your objective:</h2>

        <div className="name">
          <h2>{data?.data.name}</h2>

          <div className="key-section">
            {isSuccess &&
              data?.data.keyResultList &&
              data?.data.keyResultList.map((keyItem) => (
                <div key={keyItem.id}>
                  <div className="key-name" onClick={handleKeyNameClick}>
                    {/*<h5 className="key-title">{keyItem.id}</h5> */}
                    <p> {keyItem.description} </p>

                    <button
                      className="button"
                      onClick={() => navigate(`/key-details/${keyItem.id}`)}
                    >
                      See details
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <button
          className="button"
          onClick={() => navigate(`/add-keyresult/${urlParam.id}`)}
        >
          Add new Key +
        </button>
        {/*<p>Date: {data?.data.dateStart}</p>*/}
      </div>
    </div>
  );
};

export default ObjectiveDetails;
