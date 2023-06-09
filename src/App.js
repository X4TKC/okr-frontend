import React, {useState} from "react";
import './App.css';
import { Login } from "./Components/Pages/Login"
import { Signup } from "./Components/Pages/Signup"
import AddObjectiveForm from "./Components/Pages/AddObjectives"
import EditObjectiveForm from "./Components/Pages/EditObjective"
import ObjectiveList from "./Components/Pages/ObjectiveList";
import { BrowserRouter } from 'react-router-dom';
import ObjectiveDetails from "./Components/Pages/ObjectiveDetails";
import { Routes, Route } from "react-router-dom"
import KeyDetails from "./Components/Pages/KeyDetails";
function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm =(formName) => {
    setCurrentForm(formName);
  }
  const objective2 = {
    title: 'Complete Project 2',
    description: 'Finish all tasks for the project 2.',
    keyName: 'PROJECT-002',
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
  const objective = {
    title: 'Complete Project',
    description: 'Finish all tasks for the project.',
    keyName: 'PROJECT-001',
    date: '2023-06-15',
  };
  const keyInfo = {
    name: 'PROJECT-001',
    descriptions: [
      'Set clear and specific objectives that align with your goal.',
      'Break down your goal into smaller, manageable tasks.',
      'Create a timeline or schedule to track your progress.',
      'Stay motivated by celebrating small wins along the way.',
      'Seek support from friends, family, or a mentor to help you stay accountable.',
      'Take consistent action and adjust your approach as needed.',
      'Learn from setbacks and use them as opportunities for growth.',
      'Stay focused and maintain a positive mindset throughout your journey.',
    ],
    date: '2023-06-15',
  };
  const keyInfo2 = {
    name: 'PROJECT-002',
    descriptions: [
      'Define a compelling vision that inspires and drives you forward.',
      'Identify potential obstacles and develop strategies to overcome them.',
      'Find mentors or role models who have achieved similar goals.',
      'Surround yourself with a supportive and positive network.',
      'Practice self-care and maintain a healthy work-life balance.',
      'Embrace a growth mindset and view challenges as opportunities.',
      'Continuously learn and acquire new skills relevant to your goal.',
      'Persist in the face of setbacks and keep pushing forward.',
    ],
    date: '2023-06-21',
  };
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      {
        currentForm === "login" ?  <Route path="/" element={ <Login onFormSwitch={toggleForm} /> } /> : <Route path="/" element={ <Signup onFormSwitch={toggleForm} /> } />
      }
      <Route path="/objectives" element={<ObjectiveList objectives={objectives}/>}></Route>
      <Route path="/edit-objective/1" element={<EditObjectiveForm objective={objective} onSave={handleSave} onDelete={handleDelete} />}></Route>
      <Route path="/edit-objective/2" element={<EditObjectiveForm objective={objective2} onSave={handleSave} onDelete={handleDelete} />}></Route>
      <Route path="/objective-details/1" element={<ObjectiveDetails objective={objective}/>}></Route>
      <Route path="/objective-details/2" element={<ObjectiveDetails objective={objective2}/>}></Route>
      <Route path="/add-objective" element={<AddObjectiveForm/>}></Route>
      <Route path="/key/PROJECT-001" element={<KeyDetails keyInfo={keyInfo}/>}></Route>
      <Route path="/key/PROJECT-002" element={<KeyDetails keyInfo={keyInfo2}/>}></Route>
    </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;
