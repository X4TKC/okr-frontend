import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getObjectiveById,
  updateObjective,
  deleteObjective,
} from "../../../Services/objectiveService";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./index.css";
import { useTranslation } from "react-i18next"; // Import useTranslation
const EditObjectiveForm = () => {
  const { t } = useTranslation(); // Use the useTranslation hook to access translations
  const [name, setName] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const urlParam = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isSuccess, isFetching, isLoading, isError } = useQuery({
    queryKey: ["objectiveEdit"],
    queryFn: () => getObjectiveById(urlParam.id), //USEPARAMS
  });

  const mutation = useMutation({
    mutationFn: updateObjective,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["editObj"] });
    },
  });

  useEffect(() => {
    // Update the form fields with the objective values when it changes
    setName(data?.data.name);
    setDateStart(data?.data.dateStart.substring(0, 10));
    setDateEnd(data?.data.dateEnd.substring(0, 10));
  }, [data]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateStartChange = (event) => {
    setDateStart(event.target.value);
  };

  const handleDateEndChange = (event) => {
    setDateEnd(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (window.confirm(t("confirmSaveChanges"))) {
      mutation.mutate({
        id: urlParam.id,
        name: name,
        dateStart: dateStart,
        dateEnd: dateEnd,
      });
      navigate(-1);
    }
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(t("confirmDeleteObjective"));
    if (confirmDelete) {
      deleteObjective(urlParam.id);
      navigate(`/`);
    }
  };

  return (
    <div className="auth-form-container">
      <div className="top-buttons">
        <div className="">
          <ArrowBackIcon onClick={() => navigate(-1)}></ArrowBackIcon>
        </div>
        <div className="right-button">
          <button onClick={handleDelete} className="delete-objective-button">
            {t("deleteButton")}
          </button>
        </div>
      </div>
      <h2>{t("editObjective")}</h2>
      <br></br>
      <form className="objective-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">{t("name")}</label>

          <input
            className="input-edit-objective"
            value={name}
            onChange={handleNameChange}
            type="name"
            placeholder={t("name")}
            id="name"
            name="name"
            required
          ></input>
        </div>
        <div className="input-group">
          <label htmlFor="description">{t("startDate")}</label>
          <input
            className="input-edit-objective"
            value={dateStart}
            onChange={handleDateStartChange}
            type="date"
            placeholder={t("startDate")}
            id="startDate"
            name="startDate"
            required
          ></input>
        </div>
        <div className="input-group">
          <label htmlFor="date">{t("endDate")}</label>

          <input
            className="input-edit-objective"
            value={dateEnd}
            onChange={handleDateEndChange}
            type="date"
            placeholder={t("endDate")}
            id="endDate"
            name="endDate"
            required
          ></input>
        </div>
        <button className="add-objective-button" type="submit">
          {t("saveChanges")}
        </button>
        <button
          className="cancel-objective-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          {t("cancel")}
        </button>
      </form>
    </div>
  );
};

export default EditObjectiveForm;
