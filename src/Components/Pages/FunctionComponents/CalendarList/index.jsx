import React from "react";
import Calendar from "react-calendar";
import "./index.css";
import { Link } from "react-router-dom";
import KeyResultListFunction from "../KeyResultListFunction";

function CalendarList({ data }) {
  const functionData = {
    outputHTML() {
      if (data.length === 0) {
        return (
          <div>
            <div>
              <img src={require("../../../Images/star.png")} alt="Star" />
              <br />
              <>
                This screen is where all your goals will appear
                <br />
              </>
              <h3>
                <br />
                Add new Goals!.
              </h3>
            </div>
            <div>
              <br />
              <img
                src={require("../../../Images/calendar.png")}
                alt="Calendar"
              />
              <br />
              <>
                <br />
                This screen is where all your calendar goals will appear
                <br />
              </>
            </div>
          </div>
        );
      }

      return (
        <div className="objectives">
          {data.map((objective) => {
            const currentDate = new Date();
            const startDate = new Date(objective.dateStart);
            const endDate = new Date(objective.dateEnd);
            const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24); // Total days between start and end dates
            const daysElapsed = Math.max(
              0,
              (currentDate - startDate) / (1000 * 60 * 60 * 24)
            ); // Days elapsed from start date (bounded at 0)
            const progressPercentage = objective.progressTracker / totalDays;
            return (
              <div key={objective.id} className="objective-item">
                <h3 className="objective-title-calendar">{objective.name}</h3>
                <KeyResultListFunction list={objective.keyResultList} />
                <p>{progressPercentage.toFixed(2) * 100}%</p>
                <Link
                  to={`/objective-details/${objective.id}`}
                  className="edit-link"
                >
                  Details
                </Link>
                <div className="calendar-container">
                  <h3 className="calendar-title">Calendar</h3>
                  <Calendar
                    key={objective.id}
                    className={["react-calendar"]}
                    tileClassName={({ date }) => {
                      const currentDate = new Date(date);
                      if (currentDate >= startDate && currentDate <= endDate) {
                        return "highlight";
                      }
                      return "";
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    },
  };

  return <div className="">{functionData.outputHTML()}</div>;
}

export default CalendarList;
