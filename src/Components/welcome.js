import React from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import Home from '../containers/Home'
import Login from './Login'


const Welcome = () => {
    return(
        <div>
            {!localStorage.token ? 
            <Login /> : 
            <Home />}
        </div>
    )
}

export default Welcome