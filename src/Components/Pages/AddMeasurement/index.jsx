import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKeytById, updateKey } from "../../../Services/keyService";
import "./index.css";

// Import the useTranslation hook from react-i18next
import { useTranslation } from "react-i18next";

const AddMeasurement = () => {
  const { t } = useTranslation(); // Use the translation hook to access translation functions
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
    queryFn: () => getKeytById(urlParam.keyId),
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    mutation.mutate({
      id: data?.data.id,
      description: data?.data.description,
      objectiveId: data?.data.objectiveId,
      action: data?.data.action,
      measurement: measurement,
      check: data?.data.check,
    });

    navigate(`/key-details/${urlParam.keyId}`);
    setMeasurement("");
  };

  return (
    <div>
      <div className="auth-form-container-add-measurement">
        <ArrowBackIcon onClick={() => navigate(-1)}></ArrowBackIcon>
        <h2 className="section-title">{t("definingTheKeyMeasurement")}</h2>
        <div className="instructions definition">
          <label className="instruction-label" htmlFor="keyresult">
            {t("rememberTo")}
          </label>
          <h3 className="instruction-text" htmlFor="action">
            {t("determineHowYouWillTrack")}
          </h3>
          <ul className="instruction-list">
            <li className="keyresult-details-remember-to">
              {t("trackBodyFatPercentage")}
            </li>
            <li className="keyresult-details-remember-to">
              {t("monitorDistanceTimeHeartRate")}
            </li>
            <li className="keyresult-details-remember-to">
              {t("keepARecordOfTheWeight")}
            </li>
            <li className="keyresult-details-remember-to">
              {t("setSpecificFlexibilityGoals")}
            </li>
          </ul>
        </div>
        <form className="objective-form" onSubmit={handleSubmit}>
          <input
            className="input-measurement-defining"
            value={measurement}
            onChange={handleMeasurementChange}
            type="text"
            placeholder={t("measurementvar")}
            id="measurement"
            name="measurement"
          />
          <br />
          <br />

          <button className="add-measurement-button" type="submit">
            {t("addMeasurement")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMeasurement;
