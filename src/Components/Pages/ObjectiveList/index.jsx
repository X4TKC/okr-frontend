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
      <h1 className="list-title">
        Welcome to O.K.R.<br></br>
        <br></br>
      </h1>
      <h2 className="list-title">
        To Your Goal Tracker App!<br></br>
        <br></br>
      </h2>
      <p className="list-title">
        Hello, We're excited to have you here. This is your personal Goal
        Tracker application where you can set and manage your Objectives and Key
        Results (OKRs).<br></br>
      </p>

      <h3 className="objectives-title">Here is a list of all your goals:</h3>
      {isError && <p>No objectives available</p>}
      {isSuccess && <CalendarList data={data?.data} />}
      <p className="list-title">
        <br></br>Ready to continue? Let's create your next objective! Click the
        button below to begin:
      </p>
      <Link to={`/add-objective`} className="add-objective-button">
        Add New Objective
      </Link>
    </div>
  );
};

export default ObjectiveList;
