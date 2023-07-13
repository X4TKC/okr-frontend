import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import AuthDetails from "../../Auth/AuthDetails";
import "./index.css";
import { getUserById } from "../../../Services/userService";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ObjectiveList = ( ) => {
  // Extract unique dates from objectives
{  /*const objectiveDates = [
    ...new Set(objectives.map((objective) => objective.date.slice(0, 10))),
  ];*/}

  const [objectives, setObjectives] = useState();
/*
  useEffect(()=> {

    const asyncFn = async () => { await setObjectives(objectiv) };
    asyncFn();
    console.log("skjdksd", typeof( objectiv)) 
  },[])
*/

  const queryClient = useQueryClient()

  // Queries
  const  { data, isSuccess, isFetching, isLoading, isError }  = useQuery(
    { 
    queryKey: ['objectives'], 
    queryFn: () => getUserById("user_1") 
    })
/*
  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })*/


  return (
    <div className="objective-list">
      <h2 className="list-title">Objective List</h2>
  
      { isError && (
        <p>No objectives available</p>
      ) }
      { isSuccess  && data?.objectiveList &&
      (
        console.log(data?.objectiveList),
        <div className="body-calendar-objectives">
          <div className="calendar-section">
          <h3 className="calendar-title">Calendar</h3>
{/*          <Calendar className={['react-calendar']}
            tileClassName={({ date }) =>
              objectiveDates.includes(date.toISOString().slice(0, 10))
                ? "highlight"
                : ""
            }
          />*/}
          </div>
          <div>
          <h3 className="objectives-title">Objectives</h3>
          <ul className="objectives">
            {data?.objectiveList.map((objective) => (
              console.log(objective,"AA"),

              <li key={objective.id} className="objective-item">
                {<h3 className="objective-title">{objective.name}</h3>}
                <Link
                  to={`/objective-details/${objective.id}`}
                  className="edit-link"
                >
                  Details
                </Link>
               {/* <p className="objective-description">{objective.description}</p>*/}
                <p className="objective-date"> Start Date : {objective.dateStart.substring(0, 10)}</p>
                <p className="objective-date"> End Date : {objective.dateEnd.substring(0, 10)}</p>
             {  /* <Link
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
      <Link to="/add-objective" className="add-objective-button">
        Add New Objective
      </Link>
      <AuthDetails />
    </div>
  );
};

export default ObjectiveList;
