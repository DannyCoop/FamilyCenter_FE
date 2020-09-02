import React from 'react'
import {route} from 'react-router-dom'
import Login from '../Components/Login'
import Signup from '../Components/Signup'

function log() {
    return(
        <div>
            {!localStorage.token ? <Route exact path="/" component={Login}></Route> : <Route path="/welcome/signup" component={Signup}></Route>}
        </div>
    )
}