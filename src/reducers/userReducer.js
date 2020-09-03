let initialState = {users: []}

let userReducer = (state= initialState, action) => {
    switch(action.type) {
        case 'ADD_USERS':
            return  {...state, users: action.familyOnly}
        default:
            return state
    }
}

export default userReducer 



