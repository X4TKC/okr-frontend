import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import { getObjectives } from "../../../Services/objectiveService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSessionContext } from "../../../App";
const ObjectiveList = () => {
  const { session, setSession } = useSessionContext();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState("");
  const urlParam = useParams();
  useEffect(() => {
    setUserId(session);
  }, []);
  const { data, isSuccess, isFetching, isLoading, isError } = useQuery({
    queryKey: ["objectives"],
    queryFn: () => getObjectives(session),
    enabled: !!session,
  });
  console.log("data", data?.data);
  return (
    <div className="objective-list">
      <h2 className="list-title">Objective List</h2>
      {isError && <p>No objectives available</p>}
      {isSuccess && data?.data && (
        <div className="body-calendar-objectives">
          <div className="calendar-section">
            <h3 className="calendar-title">Calendar</h3>
            {data?.data.map((objective) => (
              <Calendar
                className={["react-calendar"]}
                tileClassName={({ date }) => {
                  const currentDate = new Date(date);
                  const startDate = new Date(objective.dateStart);
                  const endDate = new Date(objective.dateEnd);

                  if (currentDate >= startDate && currentDate <= endDate) {
                    return "highlight";
                  }
                  return "";
                }}
              />
            ))}
          </div>
          <div>
            <h3 className="objectives-title">Objectives</h3>
            <ul className="objectives">
              {data?.data.map((objective) => (
                <li key={objective.id} className="objective-item">
                  {<h3 className="objective-title">{objective.name}</h3>}
                  <Link
                    to={`/objective-details/${objective.id}`}
                    className="edit-link"
                  >
                    Details
                  </Link>
                  {/* <p className="objective-description">{objective.description}</p>*/}
                  <p className="objective-date">
                    {" "}
                    Start Date : {objective.dateStart.substring(0, 10)}
                  </p>
                  <p className="objective-date">
                    {" "}
                    End Date : {objective.dateEnd.substring(0, 10)}
                  </p>
                  {/* <Link
                  to={`/edit-objective/${objective.id}`}
                  className="edit-link"
                >
                  Edit
                </Link>*/}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Link to={`/add-objective`} className="add-objective-button">
        Add New Objective
      </Link>
    </div>
  );
};

export default ObjectiveList;
