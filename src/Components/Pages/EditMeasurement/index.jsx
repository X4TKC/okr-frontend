import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKeytById, updateKey } from "../../../Services/keyService";


const EditMeasurement = () => {
  const [measurement, setMeasurement] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const urlParam = useParams();

  const handleMeasurementChange = (event) => {
    setMeasurement(event.target.value);
  };



  
  const mutation = useMutation({
    mutationFn: updateKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['EditMeasurement'] })
    }
  })

  const  { data, isSuccess, isFetching, isLoading, isError }  = useQuery(
    { 
    queryKey: ['keyInfo'], 
    queryFn: () => getKeytById(urlParam.keyId)  //USEPARAMS
    })




    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Perform any additional validation or processing here
      // For this example, we'll just log the values to the console
      console.log("Measurement:", measurement);
  

      mutation.mutate({
        id: data?.data.id,
        description: data?.data.description,
        objectiveId:data?.data.objectiveId,
        action: data?.data.action,
        measurement:measurement  
      })
   
      navigate(`/key-details/${urlParam.keyId}`)
      // Clear the form fields after submitting
      setMeasurement("");



    };
  return (
    <div>
      <div className="auth-form-container">
        
       <ArrowBackIcon onClick={()=> navigate(-1)}></ArrowBackIcon>
        <h2>Edit Measurement</h2>
       
        <form className="objective-form" onSubmit={handleSubmit}>
          <label htmlFor="measurement">Measurement</label>
          <br />
          <input
            value={measurement}
            onChange={handleMeasurementChange}
            type="measurement"
            placeholder="e.g.,
            touching toes, performing a full split"
            id="measurement"
            name="measurement"
          ></input>
          <br />


        <button  type="submit">Save measurement</button>

        </form>

      </div>
    </div>
  );
};

export default EditMeasurement;
