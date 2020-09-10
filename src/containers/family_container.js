import React from 'react'
import { connect, useSelector } from 'react-redux'
import FamilyMember from '../Components/familyMember'
import NavBar from './NavBar'
import { Grid, Segment} from 'semantic-ui-react'
import "../CSS_Folder/Users_css/familyPage.css"

const FamilyContainer = () => {
    const family = useSelector(state => state.users)
    const firstUser = family.users[0] ? family.users[0].family.family_name : null
    const showFamily = () => {
        return family.users.map(user => 
            <Grid.Column width={2}>
                <FamilyMember 
                user = {user}
                />
            </Grid.Column>
        )
    }
    
    return(
        <div className="Family-box">
            {/* <NavBar /> */}
            <h1>{firstUser}</h1>
            <Segment>
                <Grid columns={4} divided>
                    <Grid.Row stretched>
                        {showFamily()}
                    </Grid.Row>
                </Grid>
            </Segment>
            
        </div>
    )
}


export default connect(null, null) (FamilyContainer)