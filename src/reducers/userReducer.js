let initialState = {users: [], family: []}

let userReducer = (state= initialState, action) => {
    switch(action.type) {
        case 'ADD_USERS':
            return  {...state, users: [...state.users, action.fetchedUsers]}
        default:
            return state
    }
}

export default userReducer 



