import React, {useState} from 'react'
import task from '.././CSS_Folder/Task_CSS/task.css'
import taskUpdate from '../Actions/taskUpdate'
import FamilyFormModal from './FamilyFormModal'
import { connect, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'semantic-ui-react'

const Task = (props) => {

    const [on, setOn] = useState(false);
    const family = useSelector(state => state.users)
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPoints, setTaskPoints] = useState("");
    const [taskUser, setTaskUser] = useState("")

    const option = () => {
        return family.users.map(user => <option value={user.id}> {user.name}</option>)
    }

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value)
        console.log(e.target.value)
    }

    const handleTaskDescriptionChange = (e) => {
        setTaskDescription(e.target.value)
        console.log(e.target.value)
    }

    const handleTaskPointsChange = (e) => {
        setTaskPoints(e.target.value)
        console.log(e.target.value)
    }

    const handleTaskUserChange = (e) => {
        setTaskUser(e.target.value)
        console.log(e.target.value)
    }

    const handleSubmit = () => {
        const params = {
            name: taskName,
            description: taskDescription,
            points: taskPoints,
            user_id: taskUser
        }
        debugger
        fetch("http://localhost:3000/api/v1/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setOn(false)
        })
    }

    const taskList = () => {
        if(localStorage.userCat.toLowerCase() !== "parent"){
            if(props.user.tasks.length > 0)
                return props.user.tasks.map(task => <li>{task.name} Points: {task.points} <button onClick={() => completeTask(task.points, task)}>Complete</button></li>)
            else{
                return <li>You have no task.</li>
            }
        }else{
            return (
            <Modal 
                size="small"
                onClose={() => setOn(false)}
                onOpen={() => setOn(true)}
                open={on}
                trigger={<Button size="mini" >Add Task</Button>}
        > 
                <Modal.Header>
                    Create a task
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Field>
                            <label>Task Name</label>
                            <input onChange={(e) => handleTaskNameChange(e)} name="name" placeholder='Task Name' />
                        </Form.Field>
                        <Form.Field>
                            <label>Task Description</label>
                            <input onChange={(e) => handleTaskDescriptionChange(e)} placeholder='Task Description' />
                        </Form.Field>
                        <Form.Field>
                            <label>Point Amount</label>
                            <input onChange={(e) => handleTaskPointsChange(e)} type="number" placeholder='10' />
                        </Form.Field>
                        <Form.Field onChange={(e) => handleTaskUserChange(e)} label='Tasker' control='select'>
                            {option()}
                        </Form.Field>
                            <input type="submit"/>
                    </Form>
                </Modal.Content>

            </Modal>)
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
        {localStorage.userCat.toLowerCase() === "parent" ? <h3>Create a Task</h3> : <h3>My Task</h3>}
        <div className="task">
            {/* {console.log(props.user.tasks)} */}
            {taskList()}
        </div>
    </div>
    )
}


export default connect()(Task)