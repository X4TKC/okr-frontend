import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKeytById, updateKey } from "../../../Services/keyService";

// Import the useTranslation hook from react-i18next
import { useTranslation } from "react-i18next";

const AddAction = () => {
  const { t } = useTranslation(); // Use the translation hook to access translation functions
  const [action, setAction] = useState("");
  const queryClient = useQueryClient();
  const urlParam = useParams();
  const navigate = useNavigate();

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const mutation = useMutation({
    mutationFn: updateKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AddAction"] });
    },
  });

  const { data, isSuccess } = useQuery({
    queryKey: ["keyInfo"],
    queryFn: () => getKeytById(urlParam.keyId),
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    mutation.mutate({
      id: data?.data.id,
      description: data?.data.description,
      objectiveId: data?.data.objectiveId,
      action: action,
      measurement: data?.data.measurement,
      check: data?.data.check,
    });

    setAction("");
    navigate(`/key-details/${urlParam.keyId}`);
  };

  return (
    <div>
      <div className="auth-form-container-add-action">
        <ArrowBackIcon onClick={() => navigate(-1)}></ArrowBackIcon>
        <h2 className="section-title">{t("definingTheKeyAction")}</h2>
        <div className="instructions definition">
          <label className="instruction-label" htmlFor="keyresult">
            {t("rememberTo")}
          </label>
          <h3 className="instruction-text" htmlFor="action">
            {t("identifyTheActions")}
          </h3>
        </div>
        <div className="instructions definition">
          <label className="instruction-label">{t("forExample")}:</label>
          <ul className="instruction-text">
            <li className="keyresult-details-remember-to">
              {t("balancedDiet")}
            </li>
            <li className="keyresult-details-remember-to">
              {t("aerobicExercises")}
            </li>
            <li className="keyresult-details-remember-to">
              {t("strengthTraining")}
            </li>
            <li className="keyresult-details-remember-to">
              {t("stretchingExercises")}
            </li>
          </ul>
        </div>
        <form className="objective-form" onSubmit={handleSubmit}>
          <input
            className="input-action-defining "
            value={action}
            onChange={handleActionChange}
            type="text"
            placeholder={t("actionvar")}
            id="action"
          ></input>
          <br />
          <button className="add-action-button" type="submit">
            {t("addAction")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAction;
