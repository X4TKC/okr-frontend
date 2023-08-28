import React from "react";
import Calendar from "react-calendar";
import "./index.css";
import { Link } from "react-router-dom";
import KeyResultListFunction from "../KeyResultListFunction";
import ProgressChart from "../../../../Utils/ProgressChart";
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

            return (
              <div key={objective.id} className="objective-item">
                <Link
                  className="objective-title-calendar"
                  to={`/objective-details/${objective.id}`}
                >
                  {objective.name}
                </Link>
                {objective.enable == true ? (
                  <div>
                    {objective.state != "Completed" ? (
                      <KeyResultListFunction list={objective.keyResultList} />
                    ) : (
                      <div>
                        <img
                          src={require("../../../Images/missionc.png")}
                          alt="missionc"
                        />
                        <p className="calendar-title">{objective.state}</p>
                      </div>
                    )}

                    <p>{objective.progressTracker}%</p>
                    <data></data>
                    <div className="calendar-container">
                      <h3 className="calendar-title">Calendar</h3>
                      <Calendar
                        key={objective.id}
                        className={["react-calendar"]}
                        tileClassName={({ date }) => {
                          const currentDate = new Date(date);
                          if (
                            currentDate >= startDate &&
                            currentDate <= endDate
                          ) {
                            return "highlight";
                          }
                          return "";
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3>
                      <br />
                      Goal expired!
                    </h3>
                  </div>
                )}
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
