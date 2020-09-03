export const fetchUsers = () => {
    // debugger
    
    return (dispatch) => {
        // debugger
        fetch("http://localhost:3000/api/v1/users")
        .then(res => res.json())
        .then(fetchedUsers => { 
        const familyOnly = fetchedUsers.filter(user => user.family_id == localStorage.familyId) 
        dispatch( {type: 'ADD_USERS', familyOnly})
        })
    }
}
