import React, {useEffect} from 'react'
import TaskList from './taskList'
import Calendar from '../Components/Calendar'
import NavBar from './NavBar'
import {Route} from "react-router-dom"
import Login from '../Components/Login';
import { connect, useSelector } from 'react-redux';

const Home = (props) => {
    const users = useSelector(state => state.users)
    const tradeRequest = () => {
        const currentUser = users.users.filter(user => user.name === localStorage.name)[0]
        if(currentUser != undefined){
        fetch(`http://localhost:3000/api/v1/requestee_task/${currentUser.id}`)
        .then(res => res.json())
        .then(data => props.dispatch({type: "FETCH_TRADE_REQUEST", data}))
        }
    }

    useEffect(() => {tradeRequest()},[] )


    return(
        <div>
            <NavBar /> 
            <br></br>
            <TaskList /> 
            <br></br>
            <Calendar />
        </div>
        
    )
}

export default connect() (Home)