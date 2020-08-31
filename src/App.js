import React from 'react';
import './App.css';
import Login from "./Components/Login"
import Signup from './Components/Signup';
import TaskList from './containers/taskList';


function App() {
  return (
    <div className="App">
      {/* <Login />
      <Signup /> */}
      <TaskList />
    </div>
  );
}

export default App;
