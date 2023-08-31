import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKeytById, updateKey } from "../../../Services/keyService";
import "./index.css";
import { useTranslation } from "react-i18next"; // Import useTranslation

const EditMeasurement = () => {
  const { t } = useTranslation(); // Initialize the translation hook
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
      queryClient.invalidateQueries({ queryKey: ["EditMeasurement"] });
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
      <div className="auth-form-container">
        <ArrowBackIcon onClick={() => navigate(-1)}></ArrowBackIcon>
        <h2>{t("editMeasurementTitle")}</h2>
        <form className="objective-form" onSubmit={handleSubmit}>
          <br />
          <input
            className="input-measurement-objective"
            value={measurement}
            onChange={handleMeasurementChange}
            type="measurement"
            placeholder={t("measurementLabel")}
            id="measurement"
            name="measurement"
          ></input>
          <br />
          <button className="add-measurement-button" type="submit">
            {t("saveMeasurementButton")} {/* Use the translated button label */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMeasurement;
