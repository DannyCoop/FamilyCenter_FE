import React, { Fragment, useState } from 'react'
import addToArray from '../Actions'
import { useSelector, useDispatch, connect} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import Home from './Home'
import {useHistory} from 'react-router-dom'
import { Button, Modal, Segment, Menu } from 'semantic-ui-react'
import {fetchUsers} from '../Actions/fetchUser'
import '../CSS_Folder/navBar.css'


const NavBar = (props) => {
    // const users = useSelector(state => state.fetchUsers);
    // const dispatch = useDispatch()

    const history = useHistory();
    const [tradeNotification, setTradeNotification] = useState(false)
    const [activeItem, setActiveItem] = useState('Home')
    // const [isVisible, setIsVisible] = useState(false)

    const handleItemClick = (e,url) => {
        // debugger
        setActiveItem(e.target.textContent)
        history.push(`/`+ url)
    }

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

    const handleTrade = (requestee_id, requester_id, pending_task_id, requestee_task_id, requester_task_id) => {
        handleRequesteeTrade(requestee_id, requester_id, pending_task_id, requestee_task_id, requester_task_id)
        handleRequesterTrade(requestee_id, requester_id, pending_task_id, requestee_task_id, requester_task_id)
        handlePendingDelete(pending_task_id)
        setTradeNotification(false)
        props.dispatch(fetchUsers())
    }
    const handleReject = (pending_task_id) => {
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
                        <div >
                            <Button onClick={() => handleTrade(
                                notification.requestee_id, 
                                notification.requester_id, 
                                notification.pending_task_id, 
                                notification.requestee_task.id, 
                                notification.requester_task.id)}>Accept?</Button>
                            <Button onClick={() => handleReject(notification.pending_task_id)}>Decline</Button>
                        </div>
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
        <Menu className="navBar" pointing secondary>
            {/* {!localStorage.token ? history.push("/Login") : history.push("/Home")} */}
                <Menu.Item
                    name="Family Center"
                    active={activeItem === 'Home'}
                    onClick={(e) => handleItemClick(e, "Home")}

                />
                <Menu.Item
                    name="My Family"
                    active={activeItem === "My Family"}
                    onClick={(e) => handleItemClick(e, "MyFamily")}
                />
            <Modal
                size="small"
                onClose={() => setTradeNotification(false)}
                onOpen={() => setTradeNotification(true)}
                open={tradeNotification}
                trigger = {<Menu.Item
                    name="Trade Request"
                
                />}
            >
                <Modal.Header>
                    Pending Task Trades
                </Modal.Header>
                <Modal.Content>
                    {showTradeRequest()}
                </Modal.Content>
            </Modal>
            <Link to="/Login">
            <Menu.Menu position='right'>
                <Menu.Item
                    name='Logout'
                    onClick={() => {
                        localStorage.clear()
                        props.setLogin(false)
                    }}
                />
            </Menu.Menu>
            </Link>
        </Menu>

    )
    
}

export default connect(null, null)(NavBar)