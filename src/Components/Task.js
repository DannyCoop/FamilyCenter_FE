import React, {useState} from 'react'
import task from '.././CSS_Folder/Task_CSS/task.css'
import taskUpdate from '../Actions/taskUpdate'
import FamilyFormModal from './FamilyFormModal'
import { connect, useSelector } from 'react-redux';
import { Modal, Button, Form, Segment } from 'semantic-ui-react'

const Task = (props) => {

    //How I get the user array
    const family = useSelector(state => state.users)
    const currentUser = useSelector(state => state.users.currentUser)
    
    //modal toggles
    const [on, setOn] = useState(false);
    const [tradeModal,setTradeModal] = useState(false)
    //task inputs
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPoints, setTaskPoints] = useState("");
    const [taskUser, setTaskUser] = useState("")
    //pending/trade task inputs
    const [requestee, setRequestee] = useState("")
    const [requesteeTradedTask, setRequesteeTradedTask] = useState("")
    
    const [requester, setRequester] = useState("")
    const [requesterTask, setRequesterTask] = useState("")

    //gets the options for the select
    const option = () => {
        //filters  it so it so the list does not contain the parents
        const children = family.users.filter(user => user.category.toLowerCase() === "child")
        return children.map(user => <option value={user.id}>{user.name}</option>)
    }

    const taskOptions = () => {
        let requesteeT = family.users.filter(user => user.id == requestee)
        let requesteeTask = requesteeT[0]? requesteeT[0].tasks : null
        if(requesteeTask != null){
            return requesteeTask.map(task => <option value={task.id}>{task.name}</option>)
        }
    }

    //Next 4 functions handle the input from the user
    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value)
        // console.log(e.target.value)
    }

    const handleTaskDescriptionChange = (e) => {
        setTaskDescription(e.target.value)
        // console.log(e.target.value)
    }

    const handleTaskPointsChange = (e) => {
        setTaskPoints(e.target.value)
        // console.log(e.target.value)
    }

    const handleTaskUserChange = (e) => {
        setTaskUser(e.target.value)
        // console.log(e.target.value)
    }

    //Handles the input for the pending/tradeTask
    const handleRequestee = (e) => {
        setRequestee(e.target.value)
        // console.log(e.target.value)
    }
    const handleRequesteeTaskChange = (e) => {
        setRequesteeTradedTask(e.target.value)
    }
    const handleRequester = (task) => {
        setRequesterTask(task.id)
        setRequester(task.user_id)
    }
    const handleTradeSubmit = () => {
        const tradeParams = {
            requester_id: requester,
            requestee_id: requestee,
            requester_task_id: requesterTask,
            requestee_task_id: requesteeTradedTask
        }
        fetch("http://localhost:3000/api/v1/pending_tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tradeParams)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTradeModal(false)
        })
    }

    //Makes a post that will create a a task on the back end
    const handleSubmit = () => {
        const params = {
            name: taskName,
            description: taskDescription,
            points: taskPoints,
            user_id: taskUser
        }
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

    const tradeTask = (task) => {
        return(<Modal
            size="small"
            onClose={() => setTradeModal(false)}
            onOpen={() => setTradeModal(true)}
            open={tradeModal}
            trigger={<Button onClick={() => handleRequester(task)}>Trade Task</Button>}
        >
            <Modal.Header>
                Trade a Task
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={() => handleTradeSubmit()}>
                <Form.Field onChange={(e) => handleRequestee(e)}label='Who would you like to trade with?' control='select'>
                    <option value="select">Select</option>
                    {option()}
                </Form.Field>
                <Form.Field onChange={(e) => handleRequesteeTaskChange(e)}label="What task do you want to trade?(Task you will get.)" control='select'>
                    <option value="select">Select</option>
                    {taskOptions()}
                </Form.Field>
                    <input type="submit"></input>
                </Form>
            </Modal.Content>
        </Modal>)
    }

    const taskList = () => {
        if(localStorage.userCat.toLowerCase() !== "parent"){
            if(props.user.tasks.length > 0)
                return props.user.tasks.map(task => <Segment>{task.name} Points: {task.points} <Button onClick={() => completeTask(task.points, task)}>Complete</Button> {tradeTask(task)}</Segment>)
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