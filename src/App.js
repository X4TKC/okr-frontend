import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Components/Pages/Login"
import { Signup } from "./Components/Pages/Signup"
function App() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm =(formName) => {
    setCurrentForm(formName);
  }
  return (
    <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Signup onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default App;
