import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import './index.css'
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKeytById, updateKey } from "../../../Services/keyService";

const EditAction = () => {
  const [action, setAction] = useState("");
  const queryClient = useQueryClient()
  const urlParam = useParams();
  const navigate = useNavigate();

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  
  const mutation = useMutation({
    mutationFn: updateKey,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['EditAction'] })
    }
  })

  const  { data, isSuccess, isFetching, isLoading, isError }  = useQuery(
    { 
    queryKey: ['keyInfo'], 
    queryFn: () => getKeytById(urlParam.keyId)  //USEPARAMS
    })


  const handleSubmit = (event) => {
    event.preventDefault();
    
  
    console.log("Action:", action, data);
    mutation.mutate({
      id: data?.data.id,
      description: data?.data.description,
      objectiveId:data?.data.objectiveId,
      action: action,
      measurement: data?.data.measurement  
    })
 
    setAction("");
    navigate(`/key-details/${urlParam.keyId}`)
  };

  return (
    <div>
      <div className="auth-form-container">
      <ArrowBackIcon onClick={()=> navigate(-1)}></ArrowBackIcon>
        <h2>Edit Action</h2>
   
        <form className="objective-form" onSubmit={handleSubmit}>
          <label htmlFor="action">Action</label>
          <br />
          <input
            value={action}
            onChange={handleActionChange}
            type="text"
            placeholder="action"
            id="action"
      
          ></input>
          <br />
          <button className="add-button"  type="submit">Save action</button>

        </form>
      </div>
    </div>
  );
};

export default EditAction;
