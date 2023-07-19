import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addObjective } from "../../../Services/objectiveService";


const AddObjective = ({objectives}) => {

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [nextSection, setNextSection] = useState(false);

  const navigate =useNavigate()

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const queryClient = useQueryClient()




  const mutation = useMutation({
    mutationFn: addObjective,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['addObj'] })
    }
  })


  const handleSubmit = (event) => {
    event.preventDefault();

    // For this example, we'll just log the values to the console
    console.log("Name:", name, startDate, endDate);
    mutation.mutate({
      id:"AA",
      name: name,
      keyResultList: [],
      dateStart: startDate,
      dateEnd: endDate,
      userId: "user_1",
    })
   
    navigate("/objectives");
    
  };
  return (
    <>
  

      <div>
      <div className="auth-form-container">
        <h2>New Objective Title</h2>
        <div className="auth-form-container definition">
          <label htmlFor="name">1. Define your objective:</label>
          <small>
            Clearly state your personal goal. For example, "Improve Physical
            Fitness and Achieve a Healthy Body."
          </small>
        </div>
        <form className="objective-form " onSubmit={handleSubmit}>

          <div >
            <div>
              <input
                value={name}
                onChange={handleNameChange}
                type="name"
                placeholder="Name"
                id="name"
                name="name"
                
              ></input>
            </div>
            
            <div>
           
              <DatePicker
                id="startDate"
                placeholderText="Start Date"
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="dd/MM/yyyy"
               
              />
            </div>
              
            <div>
             
              <DatePicker
                placeholderText="End Date"
                id="endDate"
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="dd/MM/yyyy"
              />
            </div>
              
          </div>
           <div className="m-10 py-10 px-40">
              <button type="submit" >Add Objective title</button>
          </div>
        </form>
       
      
      </div>
  
    </div>
   
 
    </>
  );
};

export default AddObjective;
