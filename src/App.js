import React, {useState, useEffect} from 'react';
import './App.css';
import Login from "./Components/Login"
import Signup from './Components/Signup';
import Home from './containers/Home';
import { BrowserRouter as Router} from "react-router-dom"
import {Route, Switch} from "react-router-dom"
import Welcome from './Components/Welcome'




function App(props) {

  return (
    <Router>
      <div className="App">

      <Switch>
        <Route path='/' exact component={Welcome}></Route> 
        <Route path='/Home' exact component={Home}></Route>
      </Switch>
      </div>

    </Router>
    
  );
}

export default connect(null, null)(App);
