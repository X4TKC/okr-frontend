import React, {useEffect, useState} from "react";
import './App.css';
import { Login } from "./Components/Pages/Login"
import { Signup } from "./Components/Pages/Signup"
import AddObjectiveForm from "./Components/Pages/AddObjectives"
import AddKeyResultForm from "./Components/Pages/AddKeyResults"
import AddActionForm from "./Components/Pages/AddAction"
import AddMeasurementForm from "./Components/Pages/AddMeasurement"
import EditObjectiveForm from "./Components/Pages/EditObjective"
import ObjectiveList from "./Components/Pages/ObjectiveList";
import { BrowserRouter } from 'react-router-dom';
import ObjectiveDetails from "./Components/Pages/ObjectiveDetails";
import { Routes, Route } from "react-router-dom"
import KeyDetails from "./Components/Pages/KeyDetails";
import Header from "./Components/Atoms/Header";
import { User } from "./Components/Pages/Users";
import { getUserById } from "./Services/userService";
import EditAction from "./Components/Pages/EditAction";
import EditMeasurement from "./Components/Pages/EditMeasurement";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'




function App() {

  const queryClient = new QueryClient()

  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm =(formName) => {
    setCurrentForm(formName);
  }


  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
    
          <Header />
          <div className="App">
          
          <Routes>
            <Route exact path="/objectives" element={<ObjectiveList />} />
            {
              currentForm === "login" ?  <Route path="/" element={ <Login onFormSwitch={toggleForm} /> } /> : <Route path="/" element={ <Signup onFormSwitch={toggleForm} /> } />
            }
            <Route path="/objectives" element={<ObjectiveList/>}></Route>
           
            <Route path="/edit-objective/:id" element={<EditObjectiveForm />}></Route>

        

            <Route path="/objective-details/:id" element={<ObjectiveDetails/>}></Route>
            <Route path="key-details/:id" element={<KeyDetails/>}></Route>
            <Route path="/add-objective/:userId" element={<AddObjectiveForm/>}></Route>
            <Route path="/add-keyresult/:objId" element={<AddKeyResultForm/>}></Route>
            <Route path="/add-action/:keyId" element={<AddActionForm/>}></Route>
            <Route path="/add-measurement/:keyId" element={<AddMeasurementForm/>}></Route>
            <Route path="/edit-action/:keyId" element={<EditAction/>}></Route>
            <Route path="/edit-measurement/:keyId" element={<EditMeasurement/>}></Route>
            <Route path="/user" element={<User/>}/>
          </Routes>
      
          </div>
      </BrowserRouter> 
    </QueryClientProvider>
    </>
  );
}

export default App;
