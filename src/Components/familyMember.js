import React from 'react'
import { connect } from 'react-redux'
// import familyPage from '../CSS_Folder/Users_css/familyPage.css'


const FamilyMember = (props) => {
    return(
        <div>
            <div className="member-profile">
                Name: {props.user.name} <br></br>
                Category: {props.user.category} <br></br>
                Points: {props.user.points}
                {/* {console.log(props.user.family)} */}
            </div>
        </div>
    )
}



export default connect(null, null) (FamilyMember)