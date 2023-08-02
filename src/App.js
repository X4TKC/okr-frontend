import React, {useEffect, createContext, useContext, useState} from "react";
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
import EditAction from "./Components/Pages/EditAction";
import EditMeasurement from "./Components/Pages/EditMeasurement";
import Session from "./Components/Session";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import MainPage from "./Components/Pages/MainPage";
const SessionContext = createContext();
export const useSessionContext = () => useContext(SessionContext);
function App() {
  const { session, setSession, clearSession } = Session();
  const queryClient = new QueryClient()
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm =(formName) => {
    setCurrentForm(formName);
  }
  return (
    <SessionContext.Provider value={{ session, setSession, clearSession }}>
    <QueryClientProvider client={queryClient} >
      <BrowserRouter>
          <div className="App">
          <Routes>
            <Route exact path="/" element={<MainPage />}/>
            {/*<Route exact path="/objectives" element={<ObjectiveList />} />*/}
            {
              currentForm === "login" ?  <Route path="/login" element={ <Login onFormSwitch={toggleForm} session={setSession} /> } /> : <Route path="/signup" element={ <Signup onFormSwitch={toggleForm} /> } />
            }
            {/*<Route path="/objectives" element={<ObjectiveList/>}></Route>*/}
            <Route path="/edit-objective/:id" element={<EditObjectiveForm />}></Route>
            <Route path="/objective-details/:id" element={<ObjectiveDetails/>}></Route>
            <Route path="key-details/:id" element={<KeyDetails/>}></Route>
            <Route path="/add-objective" element={<AddObjectiveForm/>}></Route>
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
    
    </SessionContext.Provider>
    
  );
}
export default App;
