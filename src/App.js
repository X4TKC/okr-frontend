import React, {useState} from "react";
import AuthDetails from "./Components/Auth/AuthDetails";
import './App.css';
import { Login } from "./Components/Pages/Login"
import { Signup } from "./Components/Pages/Signup"
import ObjectiveForm from "./Components/Pages/Objectives"
import EditObjectiveForm from "./Components/Pages/EditObjective"
import ObjectiveList from "./Components/Pages/ObjectiveList";
import { BrowserRouter } from 'react-router-dom';
function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm =(formName) => {
    setCurrentForm(formName);
  }
  const objective = {
    title: 'Sample Title',
    description: 'Sample Description',
    keyName: 'Sample Key Name',
    date: '2023-06-06'
  };

  const handleSave = (updatedObjective) => {
    // Handle save logic here
    console.log('Updated Objective:', updatedObjective);
  };

  const handleDelete = (objectiveId) => {
    // Handle delete logic here
    console.log('Objective ID to delete:', objectiveId);
  };
  const objectives = [
    { id: 1, title: 'Objective 1', description: 'Description 1', date: '2023-06-05' },
    { id: 2, title: 'Objective 2', description: 'Description 2', date: '2023-06-07' },
    // ... other objectives
  ];
  return (
    <div>
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />
      }
    </div>
    <div className="App"><AuthDetails /></div>
    <div className="App"><EditObjectiveForm objective={objective} onSave={handleSave} onDelete={handleDelete} /></div>
    <BrowserRouter>
    <div className="App"><ObjectiveList objectives={objectives} /></div>
    </BrowserRouter>
    </div>
  );
}

export default App;
