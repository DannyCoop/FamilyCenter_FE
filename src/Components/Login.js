import React, {Component, Fragment, useState, useEffect} from 'react'
import {Route, Switch, Link} from 'react-router-dom'
import Home from '../containers/Home'
import {useHistory} from 'react-router-dom'
import {fetchUsers} from '../Actions/fetchUser'
import {connect} from 'react-redux'
import Signup from './Signup'
import { Button, Segment, Form } from 'semantic-ui-react'
import '../CSS_Folder/LoginPage.css'
import FamilyCenterLogo from '../images/FamilyCenterLogo.png'


const Login = (props) => {


    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    
    const fetchTheFamilies = () => {
        debugger
        fetch("http://localhost:3000/api/v1/families")
        .then(res => res.json())
        .then(data => {
            props.dispatch( {type: 'GET_THE_FAMILY_LIST', families: data})
        })
    }

    // useEffect(() => {
        
    // }),;


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
        if(data.token != undefined){
            localStorage.setItem("token", data.token)
        }else{
            alert("Wrong login try again.")
        }
        if(localStorage.token){
            localStorage.userCat = data.user.category
            localStorage.familyId = data.user.family_id
            localStorage.name = data.user.name
            props.dispatch(fetchUsers())
            props.setLogin(true)
            history.push("/Home")
        }
        })
    }

    return(
        <div className="Login-page">
                <img className="logo" src={FamilyCenterLogo}/> 
            <Segment className ="login-form">
                <h2 style={{textAlign: "center"}}>Login</h2><br/>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Field>
                        <label>Name</label>
                        <input onChange={(e) => handleNameChange(e)} name="name" type="text"  />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input onChange={(e) => handlePasswordChange(e)} name="password" type="password" />
                    </Form.Field>
                        <Button className="login-button" type="submit">Submit</Button>
                </Form>
                <p>Don't have a account?<Link to="/Signup" onClick={() => fetchTheFamilies()}>Signup Now</Link></p>
            </Segment>

            <Switch>
                <Route path="/Home" exact component={Home}></Route>
            </Switch>

        </div>
    )
}

export default connect(null,null) (Login)