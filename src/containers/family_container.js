import React from 'react'
import { connect, useSelector } from 'react-redux'
import FamilyMember from '../Components/familyMember'

const FamilyContainer = () => {
    const family = useSelector(state => state.users)
    const firstUser = family.users[0] ? family.users[0].family.family_name : null
    const showFamily = () => {
        return family.users.map(user => <FamilyMember 
        user = {user}
        />)
    }
    
    return(
        <div>
            <h1>{firstUser}</h1>
            {showFamily()}
        </div>
    )
}


export default connect(null, null) (FamilyContainer)