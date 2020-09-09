import React, {Component, Fragment, useState, useEffect} from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import Home from '../containers/Home'
import {useHistory} from 'react-router-dom'
import {fetchUsers} from '../Actions/fetchUser'
import {connect} from 'react-redux'
import Signup from './Signup'


const Login = (props) => {


    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    // useEffect(() => {
        
    // });


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
        // make and if statement or something to you can check if the user is logged in before setting uo locakstorage and moving to the next page
        localStorage.setItem("token", data.token)
        localStorage.userCat = data.user.category
        localStorage.familyId = data.user.family_id
        localStorage.name = data.user.name
        props.dispatch(fetchUsers())
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
                <p>Don't have a account?<Link to="/Signup">Signup Now</Link></p>
            </div>

            <Switch>
                <Route path="/Home" exact component={Home}></Route>
            </Switch>

        </Fragment>
    )
}

export default connect(null,null) (Login)