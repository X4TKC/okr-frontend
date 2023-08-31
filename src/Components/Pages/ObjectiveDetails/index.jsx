import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteObjective,
  getObjectiveById,
} from "../../../Services/objectiveService";
import { getKeys } from "../../../Services/keyService";
import { useTranslation } from "react-i18next"; // Import useTranslation

const ObjectiveDetails = () => {
  const { t } = useTranslation(); // Use the useTranslation hook to access translations

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
    queryKey: ["keyresult"],
    queryFn: () => getKeys(urlParam.id),
  });
  return (
    <div className="objective-info">
      <div className="top-buttons">
        <ArrowBackIcon onClick={() => navigate("/")}></ArrowBackIcon>
        <div className="edit-button">
          <Link
            to={`/edit-objective/${urlParam.id}`}
            className="edit-objective-button"
          >
            {t("editObjectiveButton")}
          </Link>
        </div>
      </div>
      <h2 className="description-text">{t("objectiveDetails")}</h2>
      <div className="objective-item-details definition-details-objective">
        <label className="label-text-details">{t("rememberThat")}</label>
        <h3 className="objective-details-remember-to">
          {t("keyResultAttributes")}
        </h3>
      </div>
      <h2 className="description-text">{t("listOfKeyResult")}</h2>
      <div className="objective-details">
        <div className="key-section">
          {isSuccess && data?.data && data?.data.length > 0 ? (
            data?.data.map((keyItem) => (
              <div key={keyItem.id}>
                <div onClick={() => navigate(`/key-details/${keyItem.id}`)}>
                  &#128273;{" "}
                  <Link className="keyresult-description-details">
                    {" "}
                    {keyItem.description}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div>
              <div className="no-keyresults-text">
                {t("noKeyResultsAvailable")}
                <br />
                <br />
                <div>
                  <img src={require("../../Images/key.png")} alt="Key Result" />
                  <br />
                  <h3 className="instructions-h3-title">
                    {t("keyResultsSectionDescription1")}
                  </h3>
                  <h3 className="instructions-h3-title">
                    {t("keyResultsSectionDescription2")}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          className="add-key-result-button"
          onClick={() => navigate(`/add-keyresult/${urlParam.id}`)}
        >
          {t("addNewKeyResultButton")}
        </button>
      </div>
    </div>
  );
};

export default ObjectiveDetails;
