import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./index.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddKey } from "../../../Services/keyService";
import { useTranslation } from "react-i18next"; // Import useTranslation

const AddKeyResults = () => {
  const { t } = useTranslation(); // Use the useTranslation hook to access translations

  const [keyresult, setKeyResult] = useState("");
  const [objId, setObjId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setIsSubmitting(false);
      navigate(`/objective-details/${urlParam.objId}`);
    },
    onError: () => {
      setIsSubmitting(false);
      console.log(keyresult, objId);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
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
        <h2 className="description-text">{t("defineKeysOfObjective")}</h2>
        <div className="keyresult-item-details definition-keyresult-details">
          <label className="label-text-keyresult-details" htmlFor="keyresult">
            {t("rememberTo")}
          </label>
          <h3 className="keyresult-details-remember-to">
            {t("determineOutcomes")}
          </h3>
          <ul className="keyresult-examples">
            <li className="keyresult-details-remember-to">
              {t("reduceBodyFat")}
            </li>
            <li className="keyresult-details-remember-to">
              {t("increaseCardiovascularEndurance")}
            </li>
            <li className="keyresult-details-remember-to">
              {t("improveStrengthAndMuscleTone")}
            </li>
            <li className="keyresult-details-remember-to">
              {t("enhanceFlexibilityAndMobility")}
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
            placeholder={t("keyResultPlaceholder")}
            id="keyresult"
            name="keyresult"
            required
          ></input>
          <br />
          <div>
            <button
              className="add-key-result-button"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("addingKeyResult") : t("addKeyResultButton")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddKeyResults;
