import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getObjectiveById, updateObjective } from '../../../Services/objectiveService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const EditObjectiveForm = ( ) => {
  const [name, setName] = useState();
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const urlParam = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const  { data, isSuccess, isFetching, isLoading, isError }  = useQuery(
  { 
    
  queryKey: ['objectiveEdit'], 
  queryFn: () => getObjectiveById(urlParam.id)  //USEPARAMS
  })

  
const mutation = useMutation({
  mutationFn: updateObjective,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['editObj'] })
  }
})

  useEffect(() => {
    // Update the form fields with the objective values when it changes
    setName(data?.data.name);
 
    setDateStart(data?.data.dateStart.substring(0, 10));
    setDateEnd(data?.data.dateEnd.substring(0, 10));
  }, [data]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDateStartChange = (event) => {
    setDateStart(event.target.value);
  };

  const handleDateEndChange = (event) => {
    setDateEnd(event.target.value);
  };

const handleSubmit = (event) => {
  event.preventDefault();
  if ( window.confirm('Are you sure you want to save changes to this objective?')) {
    
    mutation.mutate({
      id: urlParam.id,
      name:name,
      keyResultList:data?.data.keyResultList,
      dateStart: dateStart,
      dateEnd: dateEnd,
      userId: data?.data.userId
    });
    navigate(-1);
  }
};

const handleDelete = () => {
  const confirmDelete = window.confirm('Are you sure you want to delete this objective?');
  if (confirmDelete) {
    // Call the onDelete callback with the objective ID or any other identifier
    //onDelete(data.id);
  }
};
  

  return (
    <div className="auth-form-container">
        <ArrowBackIcon onClick={()=> navigate(-1)}></ArrowBackIcon>
        <h2>Edit Objective</h2>
    <form className="objective-form" onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
        <br />
        <input
          value={name}
          onChange={handleNameChange}
          type="title"
          placeholder="name"
          id="name"
          name="name"
          required
        ></input>
      <br />
   <label htmlFor="description">Start Date</label>
        <br />
        <input
          value={dateStart}
          onChange={handleDateStartChange}
          type="date"
          placeholder="Start Date"
          id="startDate"
          name="startDate"
          required
        ></input>
        <br />
        
    
        <label htmlFor="date">End Date</label>
        <br />
        <input
          value={dateEnd}
          onChange={handleDateEndChange}
          type="date"
          placeholder="End Date"
          id="endDate"
          name="endDate"
          required
        ></input>
        <br />
      <button type="submit">Save Changes</button>
      <button type="button" onClick={handleDelete}>Delete Objective</button>
    </form>
    </div>
  );
};

export default EditObjectiveForm;