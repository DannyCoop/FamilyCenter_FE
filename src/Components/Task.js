import React from 'react';
import task from '.././CSS_Folder/Task_CSS/task.css'

export default function Task(props){

    const taskList = () => {
        if(props.user.tasks.length > 0)
            return props.user.tasks.map(task => <li>{task.name} Points: {task.points}</li>)
        else{
            return <li>You have no task.</li>
        }
    }
    return(
        <div>
            <h3>My Task</h3>
            <div className="task">
                {console.log(props.user.tasks)}
                {taskList()}
            </div>
        </div>
    )
}