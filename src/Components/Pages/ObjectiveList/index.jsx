import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import {
  getObjectives,
  resetObjective,
} from "../../../Services/objectiveService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSessionContext } from "../../../App";
import CalendarList from "../FunctionComponents/CalendarList";
const ObjectiveList = () => {
  const { session, setSession } = useSessionContext();
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState("");
  const urlParam = useParams();
  // State to track the last checked date
  const [lastCheckedDate, setLastCheckedDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  useEffect(() => {
    setUserId(session);
  }, []);
  const { data, isSuccess, isFetching, isLoading, isError } = useQuery({
    queryKey: ["objectives"],
    queryFn: () => getObjectives(session),
    enabled: !!session,
  });
  // Function to reset objectives if a new day has started
  const checkAndResetObjectives = async () => {
    const currentDate = new Date().toISOString().substring(0, 10);
    {
      /*const currentDate2 = new Date();
    currentDate2.setDate(currentDate2.getDate() + 1);
  const formattedDate = currentDate2.toISOString().substring(0, 10);*/
    }
    /*if (currentDate !== lastCheckedDate) {
      // Update last checked date

      setLastCheckedDate(currentDate);

      // Reset objectives
      const objectives = data?.data;

      // Reset each expired objective
      if (objectives) {
        if (Array.isArray(objectives)) {
          for (const objective of objectives) {
            await resetObjective(objective.id);
          }
        } else {
          // Reset the single objective
          await resetObjective(objectives.id);
        }
      }
      // Refetch the objectives to update the UI
      queryClient.invalidateQueries("objectives");
    }*/
  };
  useEffect(() => {
    checkAndResetObjectives();
    const intervalId = setInterval(checkAndResetObjectives, 1000); // Check every minute
    return () => clearInterval(intervalId);
  }, []);
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
      <p className="list-little-tittle">
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
