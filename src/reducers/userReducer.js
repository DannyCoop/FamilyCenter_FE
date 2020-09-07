let initialState = {users: []}

let userReducer = (state= initialState, action) => {
    switch(action.type) {
        case 'ADD_USERS':
            return  {...state, users: action.familyOnly}
        case 'UPDATE_TASK':
            return {...state, users:[...state.users.filter(user => user.id !== action.user.id), action.user]} 
        default:
            return state
    }
}

export default userReducer 



