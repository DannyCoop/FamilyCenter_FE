import React, { Fragment } from 'react'
import addToArray from '../Actions'
import { useSelector, useDispatch} from 'react-redux'
import {Route, Link} from 'react-router-dom'
import Home from './Home'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'


const NavBar = (props) => {
    // const users = useSelector(state => state.fetchUsers);
    // const dispatch = useDispatch()

    const history = useHistory();

    return(
        <Fragment>
            <div>
                {!localStorage.token ? history.push("/Login") : history.push("/Home")}
            <Link to="/MyFamily">
                <button>My Family</button>
            </Link>
            <Link to="/Login">
                <button onClick={() => localStorage.clear()}>Logout</button>
            </Link>
            </div>
        </Fragment>

    )
    
}

export default connect(null, null)(NavBar)