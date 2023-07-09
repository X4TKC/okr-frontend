import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import AuthDetails from "../../Auth/AuthDetails";
import "./index.css";

const ObjectiveList = ({ objectives }) => {
  // Extract unique dates from objectives
  const objectiveDates = [
    ...new Set(objectives.map((objective) => objective.date.slice(0, 10))),
  ];
  return (
    <div className="objective-list">
      <h2 className="list-title">Objective List</h2>
      {objectives.length === 0 ? (
        <p>No objectives available</p>
      ) : (
        <div className="body-calendar-objectives">
          <div className="calendar-section">
          <h3 className="calendar-title">Calendar</h3>
          <Calendar className={['react-calendar']}
            tileClassName={({ date }) =>
              objectiveDates.includes(date.toISOString().slice(0, 10))
                ? "highlight"
                : ""
            }
          />
          </div>
          <div>
          <h3 className="objectives-title">Objectives</h3>
          <ul className="objectives">
            {objectives.map((objective) => (
              <li key={objective.id} className="objective-item">
                <h3 className="objective-title">{objective.title}</h3>
                <Link
                  to={`/objective-details/${objective.id}`}
                  className="edit-link"
                >
                  Details
                </Link>
                <p className="objective-description">{objective.description}</p>
                <p className="objective-date">Date: {objective.date}</p>
                <Link
                  to={`/edit-objective/${objective.id}`}
                  className="edit-link"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </div>
      )}
      <Link to="/add-objective" className="add-objective-button">
        Add New Objective
      </Link>
      <AuthDetails />
    </div>
  );
};

export default ObjectiveList;
