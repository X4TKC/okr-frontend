import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import { getObjectives } from "../../../Services/objectiveService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSessionContext } from "../../../App";
import CalendarList from "../FunctionComponents/CalendarList";
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

  return (
    <div className="calendar-list">
      <h2 className="list-title">Welcome to O.K.R.</h2>
      <h3 className="objectives-title">
        Here is a list of all your objectives:
      </h3>
      {isError && <p>No objectives available</p>}
      {isSuccess && <CalendarList data={data?.data} />}
      <Link to={`/add-objective`} className="add-objective-button">
        Add New Objective
      </Link>
    </div>
  );
};

export default ObjectiveList;
