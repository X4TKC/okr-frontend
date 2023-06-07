import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ObjectiveList = ({ objectives }) => {
  // Extract unique dates from objectives
  const objectiveDates = [
    ...new Set(objectives.map((objective) => objective.date.slice(0, 10))),
  ];
  return (
    <div>
      <h2>Objective List</h2>
      {objectives.length === 0 ? (
        <p>No objectives available</p>
      ) : (
        <div>
          <h3>Calendar</h3>
          <Calendar
            tileClassName={({ date }) =>
              objectiveDates.includes(date.toISOString().slice(0, 10))
                ? "highlight"
                : ""
            }
          />
          <h3>Objectives</h3>
          <ul>
            {objectives.map((objective) => (
              <li key={objective.id}>
                <h3>{objective.title}</h3>
                <p>{objective.description}</p>
                <p>Date: {objective.date}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ObjectiveList;
