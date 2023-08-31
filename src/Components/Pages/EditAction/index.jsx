import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKeytById, updateKey } from "../../../Services/keyService";
import { useTranslation } from "react-i18next"; // Import useTranslation
const EditAction = () => {
  const [action, setAction] = useState("");
  const queryClient = useQueryClient();
  const urlParam = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Use the useTranslation hook to access translations
  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const mutation = useMutation({
    mutationFn: updateKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["EditAction"] });
    },
  });

  const { data, isSuccess, isFetching, isLoading, isError } = useQuery({
    queryKey: ["keyInfo"],
    queryFn: () => getKeytById(urlParam.keyId), //USEPARAMS
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
      <div className="auth-form-container">
        <ArrowBackIcon onClick={() => navigate(-1)}></ArrowBackIcon>
        <h2>{t("editAction")}</h2>

        <form className="objective-form" onSubmit={handleSubmit}>
          <br />
          <input
            className="input-action-objective"
            value={action}
            onChange={handleActionChange}
            type="text"
            placeholder={data?.data.action}
            id="action"
          ></input>
          <br />
          <button className="add-objective-button" type="submit">
            {t("saveAction")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAction;
