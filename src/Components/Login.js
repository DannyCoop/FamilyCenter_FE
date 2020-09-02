import React, {Component, Fragment, useState, useEffect} from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import Home from '../containers/Home'
import {useHistory} from 'react-router-dom'
import {fetchUsers} from '../Actions/fetchUser'
import {connect} from 'react-redux'


const Login = (props) => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const useEffect = (() => {
        props.dispatch(fetchUsers())
    });

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            password: password
        })
        })
        .then(res => res.json())
        .then(data => {
        localStorage.setItem("token", data.token)
        history.push("/Home")
        })
    }

    return(
        <Fragment>
            <div>
                <h2>Login</h2>
                <form onSubmit={(e) => handleSubmit(e)}>
                <label>Name</label>
                <input onChange={(e) => handleNameChange(e)} name="name" type="text"  />
                <label>Password</label>
                <input onChange={(e) => handlePasswordChange(e)} name="password" type="password" />
                <input type="submit"/>
                </form>
            </div>

            <Switch>
                <Route path="/Home" exact component={Home}></Route>
            </Switch>

        </Fragment>
    )
}

export default connect(null,null) (Login)