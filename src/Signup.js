import React, {Component} from 'react'

class Signup extends Component{

    handleChange = (e) => {
        this.setState({
        [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: this.state.name,
            password: this.state.password,
            category: this.state.category,
            points: this.state.points
        })
        })
        .then(res => res.json())
        .then(data => {
        localStorage.token = data.token
        console.log(data)
        })
    }

    render(){
        return(
        <div>
            <h2>Signup</h2>
            <form onSubmit={(e) => this.handleSubmit(e)}>
            <label>Name</label>
            <input onChange={(e) => this.handleChange(e)} name="name" type="text"  />
            <label>Password</label>
            <input onChange={(e) => this.handleChange(e)} name="password" type="password" />
            <label>Category</label>
            <input onChange={(e) => this.handleChange(e)} name="category" type="text" />
            <label>Starting Points</label>
            <input onChange={(e) => this.handleChange(e)} name="points" type="number" />
            <input type="submit"/>
            </form>
        </div>
        )
    }
}

export default Signup