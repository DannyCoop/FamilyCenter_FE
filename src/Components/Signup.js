import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { connect, useSelector } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';

const Signup = (props) => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState("");
    // const [points, setPoints] = useState("")
    const [family_id, setFamily_id] = useState("");
    const [visible, setVisible] = useState(false)
    const history = useHistory();
    const familyOptions = useSelector(state => state.users.families)


    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
        if(e.target.value === "Parent"){
            setVisible(!visible)
        }else{
            setVisible(false)
        }
    }
    // const handlePointsChange = (e) => {
    //     setPoints(e.target.value)
    // }
    const handleFamily_idChange = (e) => {
        setFamily_id(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            password: password,
            category: category,
            family_id: family_id
        })
        })
        .then(res => res.json())
        .then(data => {
        localStorage.setItem("token", data.token)
        localStorage.userCat = data.user.category
        localStorage.familyId = data.user.family_id
        localStorage.name = data.user.name
        history.push("/Home")
        })
    }

    // const parentFrom = () => {
    //     if(parentCheck === true){
    //         return(
    //         <div>
    //             <label>Family Name</label>
    //             <br/>
    //             <input name="family_name" type="text"/>
    //         </div>
    //         )
    //     }
    // }

    const showFamilyOptions = () => {
        return familyOptions.map(family => <option value={family.id}>{family.family_name}</option>)
    }
    console.log(familyOptions)
    
    const handleNewFamily = (e) =>{
        fetch("http://localhost:3000/api/v1/families", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                family_name: e.target.value
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    return(
    <div>
        <h2>Signup</h2>
        <Form onSubmit={(e) => handleSubmit(e)}><br/>
            <Form.Field>
                <label>Name</label>
                <input onChange={(e) => handleNameChange(e)} name="name" type="text"  /><br/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input onChange={(e) => handlePasswordChange(e)} name="password" type="password" /><br/>
            </Form.Field>

            <Form.Field onChange={(e) => handleCategoryChange(e)} name="category" control='select' label="Category">
                <option value="Select">Select</option>
                <option value="Child">Child</option>
                <option value="Parent">Parent</option>
            </Form.Field >
            {visible && <div className="family-form" >
                <label>Family Name</label>
                <br/>
                <input onChange={(e) => handleNewFamily(e)} name="family_name" type="text"/>
            </div> }<br/>
            {/* <label>Starting Points</label>
            <input onChange={(e) => handlePointsChange(e)} name="points" type="number" /><br/> */}
            <label>FamilyId</label>
            <Form.Field onChange={(e) => handleFamily_idChange(e)} name="family_id" type="text" control='select' >
                <option value="select">Select</option>
                {showFamilyOptions()}
            </Form.Field>
            <br/>
            <Button type="submit">Submit</Button>
        </Form>
    </div>
    )
}

export default connect() (Signup)