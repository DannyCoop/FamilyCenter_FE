import React from 'react';
import Task from '../Components/Task';
import '../CSS_Folder/Task_CSS/taskContainer.css'
import { connect, useSelector } from 'react-redux'



const TaskList = () => {
    const family = useSelector(state => state.users)
    const currentUser = family.users.filter(user => user.name === localStorage.name)

    const showTask = () => {
        // console.log(currentUser)
        return currentUser.map(user => <Task 
            user = {user} />)
    }
    return(
        <div className="TaskContainer">
            {showTask()}
        </div>
    )
}

export default connect() (TaskList)

