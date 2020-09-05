import React from 'react';
import task from '.././CSS_Folder/Task_CSS/task.css'
import taskUpdate from '../Actions/taskUpdate'
import { connect } from 'react-redux';

const Task = (props) => {

    const taskList = () => {
        if(props.user.tasks.length > 0)
            return props.user.tasks.map(task => <li>{task.name} Points: {task.points} <button onClick={() => completeTask(task.points, task)}>Complete</button></li>)
        else{
            return <li>You have no task.</li>
        }
    }

    const pointPatch = (point, task) => {
        fetch(`http://localhost:3000/api/v1/users/${props.user.id}`,{
        method: 'PATCH',
        body: JSON.stringify({
            points: props.user.points + point,
            task: task

        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
        props.dispatch({type: 'UPDATE_TASK', user: data})
    })
    }


    const completeTask = (point, task) => {
        pointPatch(point, task.id)
        console.log(task)
    }

    return(
        <div>
            <h3>My Task</h3>
            <div className="task">
                {/* {console.log(props.user.tasks)} */}
                {taskList()}
            </div>
        </div>
    )
}


export default connect()(Task)