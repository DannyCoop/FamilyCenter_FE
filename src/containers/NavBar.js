import React, { Fragment, useState } from 'react'
import addToArray from '../Actions'
import { useSelector, useDispatch, connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import Home from './Home'
import {useHistory} from 'react-router-dom'
import { Button, Modal, Segment } from 'semantic-ui-react'
import {fetchUsers} from '../Actions/fetchUser'


const NavBar = (props) => {
    // const users = useSelector(state => state.fetchUsers);
    // const dispatch = useDispatch()

    const history = useHistory();
    const [tradeNotification, setTradeNotification] = useState(false)

    const currentUser = useSelector(state => state.users.currentUser)
    // debugger
    
    const handleRequesteeTrade = (requestee_id, requester_id, pending_task_id, requestee_task_id, requester_task_id) => {
        fetch(`http://localhost:3000/api/v1/tasks/${requestee_task_id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: requester_id
        })
    })
    .then(res => res.json())
    .then(data => {console.log(data)})
    }

    const handleRequesterTrade = (requestee_id, requester_id, pending_task_id, requestee_task_id, requester_task_id) => {
        fetch(`http://localhost:3000/api/v1/tasks/${requester_task_id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: requestee_id
        })
    })
    .then(res => res.json())
    .then(data => {console.log(data)})
    }

    const handlePendingDelete = (pending_task_id) => {
        fetch(`http://localhost:3000/api/v1/pending_tasks/${pending_task_id}`,{
            method: "DELETE"
        })
    }

    const handleTrade = async (requestee_id, requester_id, pending_task_id, requestee_task_id, requester_task_id) => {
        handleRequesteeTrade(requestee_id, requester_id, pending_task_id, requestee_task_id, requester_task_id)
        handleRequesterTrade(requestee_id, requester_id, pending_task_id, requestee_task_id, requester_task_id)
        handlePendingDelete(pending_task_id)
        setTradeNotification(false)
        props.dispatch(fetchUsers())
    }

    const showNotifications = () => {
        if(currentUser){
            return( 
                <Fragment>
                    {currentUser.all_requestee_task.map(notification => 
                    <Segment>
                        <span>
                            Task you'll be receiving: &nbsp; {notification.requester_task.name}
                        </span><br/>
                        <span>
                            Task you'll be giving up: &nbsp; {notification.requestee_task.name}
                        </span><br/><br/>
                        <Button onClick={() => handleTrade(notification.requestee_id, notification.requester_id, notification.pending_task_id, notification.requestee_task.id, notification.requester_task.id)}>Accept?</Button>
                    </Segment>)}
                </Fragment>
            )
        }
    }

    const showTradeRequest =  () => {

        return(
            showNotifications()
        )
    }

    return(
        <Fragment>
            <Segment>
                {!localStorage.token ? history.push("/Login") : history.push("/Home")}
            <Link to="/MyFamily">
                <Button>My Family</Button>
            </Link>
            <Link to="/Login">
                <Button onClick={() => localStorage.clear()}>Logout</Button>
            </Link>
            <Modal
                size="small"
                onClose={() => setTradeNotification(false)}
                onOpen={() => setTradeNotification(true)}
                open={tradeNotification}
                trigger = {<Button>Trade Request</Button>}
            >
                <Modal.Header>
                    Pending Task Trades
                </Modal.Header>
                <Modal.Content>
                    {showTradeRequest()}
                </Modal.Content>
            </Modal>
            </Segment>

        </Fragment>

    )
    
}

export default connect(null, null)(NavBar)