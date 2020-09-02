import React from 'react'
import TaskList from './taskList'
import Calendar from '../Components/Calendar'
import NavBar from './NavBar'
import {Route} from "react-router-dom"
import Login from '../Components/Login';

const Home = () => {
    return(
        <div>
            <NavBar /> 
            <TaskList /> 
            <Calendar />
        </div>
        
    )
}

export default Home