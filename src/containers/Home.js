import React, {useEffect} from 'react'
import TaskList from './taskList'
import Calendar from '../Components/Calendar'
import NavBar from './NavBar'
import {Route} from "react-router-dom"
import Login from '../Components/Login';
import { connect, useSelector } from 'react-redux'

const Home = (props) => {

    return(
        <div className="Home-container">
            {/* <NavBar />  */}
            <TaskList className="taskList-container"/> 
            <Calendar className="calendar-container"/>
        </div>
        
    )
}

export default connect() (Home)