import React from 'react';
import './App.css';
import Login from "./Components/Login"
import Signup from './Components/Signup';
import Home from './containers/Home';
import { BrowserRouter as Router} from "react-router-dom"
import {Route, Switch} from "react-router-dom"


function App() {
  return (
    <Router>
      <div className="App">
        {/* <Login /> */}
      </div>
      <Switch>
        <Route path='/' exact component={Home}></Route> 
      </Switch>

    </Router>
    
  );
}

export default App;
