import React, { Fragment } from 'react'
import addToArray from '../Actions'
import { userSelector, useDispatch} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import Home from './Home'

const NavBar = () => {
    return(
        <Fragment>
            <div>
            <button className="login-btn">Login</button>
            <button>changes the state</button>
            <button onClick={() => localStorage.clear()}>Logout</button>
        </div>
            {/* <Route path="/" component={Home}></Route> */}
        </Fragment>
        
    )
    
}

export default NavBar