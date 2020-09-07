import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import { connect } from 'react-redux';

const Signup = (props) => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [category, setCategory] = useState("");
    // const [points, setPoints] = useState("")
    const [family_id, setFamily_id] = useState("");
    const [visible, setVisible] = useState(false)
    const history = useHistory();
    let parentCheck = false;

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
            setVisible(!visible)
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

    return(
    <div>
        <h2>Signup</h2>
        <form onSubmit={(e) => handleSubmit(e)}><br/>
        <label>Name</label>
        <input onChange={(e) => handleNameChange(e)} name="name" type="text"  /><br/>
        <label>Password</label>
        <input onChange={(e) => handlePasswordChange(e)} name="password" type="password" /><br/>
        <label>Category</label>
        <select onChange={(e) => handleCategoryChange(e)} name="category">
            <option value="Select">Select</option>
            <option value="Child">Child</option>
            <option value="Parent">Parent</option>
        </select>
        {visible && <div className="family-form" >
            <label>Family Name</label>
            <br/>
            <input name="family_name" type="text"/>
        </div> }
        {/* <label>Starting Points</label>
        <input onChange={(e) => handlePointsChange(e)} name="points" type="number" /><br/> */}
        <label>FamilyId</label>
        <input onChange={(e) => handleFamily_idChange(e)} name="family_id" type="text"/><br/>
        <input type="submit"/>
        </form>
    </div>
    )
}

export default connect() (Signup)