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
import { useTranslation } from "react-i18next"; // Import useTranslation

const KeyDetails = ({ keyInfo }) => {
  const { t } = useTranslation(); // Use the useTranslation hook to access translations

  const navigate = useNavigate();
  const urlParam = useParams();
  const queryClient = useQueryClient();
  const { data, isSuccess, isFetching, isLoading, isError } = useQuery({
    queryKey: ["objective"],
    queryFn: () => getKeytById(urlParam.id),
  });

  const handleDelete = () => {
    if (window.confirm(t("deleteItemConfirmation"))) {
      deleteKey(urlParam.id);
      navigate(-1);
    }
  };

  return (
    <div className="auth-form-container-key-details">
      <div className="top-buttons">
        <div className="">
          <ArrowBackIcon
            onClick={() =>
              navigate(`/objective-details/${data.data.objectiveId}`)
            }
          ></ArrowBackIcon>
        </div>
        <div className="right-button">
          <button onClick={handleDelete} className="delete-objective-button">
            {t("deleteButton")}
          </button>
        </div>
      </div>
      <h2 className="description-text-keyresult">{t("detailsOfYourKey")}</h2>
      <div className="keyresult-item-details definition-keyresult-details">
        <label className="label-text-keyresult-details">
          {t("rememberThat")}
        </label>
        <h3 className="keyresult-details-remember-to">
          {t("forThisMethodToWork")}
        </h3>
      </div>
      <div className="keyresult-details">
        <h3 className="keyresult-details-title">{data?.data.description}</h3>

        <div style={{ display: "flex", justifyContent: "center" }}></div>

        {isSuccess && data?.data.action && (
          <div>
            <div className="key-edit-action-measurement">
              <h4 className="keyresult-description-details-title">
                {t("action")}
              </h4>
              <EditIcon
                onClick={() => navigate(`/edit-action/${data?.data.id}`)}
                className="edit-icon"
              ></EditIcon>
            </div>
            <p className="keyresult-description-details-description">
              {" "}
              {data?.data.action}
            </p>
          </div>
        )}
        {isSuccess && !data?.data.action && (
          <div className="buttons">
            <button
              className="add-attributes-button"
              onClick={() => navigate(`/add-action/${data?.data.id}`)}
            >
              {t("addNewAction")}
            </button>
          </div>
        )}

        {isSuccess && data?.data.measurement && (
          <div>
            <div className="key-edit-action-measurement">
              <h4 className="keyresult-description-details-title">
                {t("measurement")}
              </h4>
              <EditIcon
                onClick={() => navigate(`/edit-measurement/${data?.data.id}`)}
                className="edit-icon"
              ></EditIcon>
            </div>

            <p className="keyresult-description-details-description">
              {" "}
              {data?.data.measurement}
            </p>
          </div>
        )}
        {isSuccess && !data?.data.measurement && (
          <div className="buttons">
            <button
              onClick={() => navigate(`/add-measurement/${data?.data.id}`)}
              className="add-attributes-button"
            >
              {t("addNewMeasurement")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyDetails;
