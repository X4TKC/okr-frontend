import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addObjective } from "../../../Services/objectiveService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSessionContext } from "../../../App";
import { useTranslation } from "react-i18next"; // Import useTranslation

const AddObjective = () => {
  const { t } = useTranslation(); // Use the useTranslation hook to access translations

  const { session } = useSessionContext();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const mutation = useMutation({
    mutationFn: addObjective,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addObj"] });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({
      name: name,
      keyResultList: [],
      dateStart: startDate,
      dateEnd: endDate,
      userId: session,
      type: "daily",
      state: "NotCompleted",
    });
    setName("");
    setEndDate(null);
    setStartDate(null);
    navigate(`/`);
  };

  return (
    <div className="auth-form-container">
      <ArrowBackIcon onClick={() => navigate(-1)} />
      <h2 className="description-text">{t("defineObjective")}</h2>
      <div className="objective-item definition">
        <label className="label-text">{t("rememberTo")}</label>
        <h3 className="objective-remember-to">{t("clearlyStateGoal")}</h3>
      </div>
      <form className="objective-form-add" onSubmit={handleSubmit}>
        <div>
          <input
            className="input-add-objective"
            value={name}
            onChange={handleNameChange}
            type="text"
            placeholder={t("namePlaceholder")}
            id="name"
            name="name"
            required
          />
          <br />
          <DatePicker
            className="input-add-objective"
            id="startDate"
            placeholderText={t("startDatePlaceholder")}
            selected={startDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy-MM-dd"
            required
            autoComplete="off"
          />
          <br />
          <DatePicker
            className="input-add-objective"
            placeholderText={t("endDatePlaceholder")}
            id="endDate"
            selected={endDate}
            onChange={handleEndDateChange}
            dateFormat="yyyy-MM-dd"
            required
            autoComplete="off"
          />
        </div>
        <div className="m-10 py-10 px-40">
          <button className="add-objective-button" type="submit">
            {t("addObjectiveButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddObjective;
