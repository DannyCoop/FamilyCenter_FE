import React, { Fragment } from 'react'
import addToArray from '../Actions'
import { useSelector, useDispatch} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import Home from './Home'
import {myfam} from '../Actions/myfam'
import {connect} from 'react-redux'

const NavBar = (props) => {
    // const users = useSelector(state => state.fetchUsers);
    // const dispatch = useDispatch()
    const handleClick = () =>  {
        props.dispatch(myfam())
    }

    return(
        <Fragment>
            <div>
            <button className="login-btn">Login</button>
            <button onClick={() => console.log("this is my family")}>My Family</button>
            <button onClick={() => localStorage.clear()}>Logout</button>
            <p></p>
        </div>
        </Fragment>
        
    )
    
}

export default connect(null, null)(NavBar)