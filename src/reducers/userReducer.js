let initialState = {users: [], currentUser: null}

let userReducer = (state= initialState, action) => {
    switch(action.type) {
        case 'ADD_USERS':
            return  {...state, users: action.familyOnly, currentUser: action.familyOnly.find(user => user.name === localStorage.name)}
        case 'UPDATE_TASK':
            return {...state, users:[...state.users.filter(user => user.id !== action.user.id), action.user]} 
        case 'UPDATE_TRADE_TASK':
            return {...state, users:[...state.users.filter(user => user.id !== action.user.id), action.user]} 
        default:
            return state
    }
}

export default userReducer 



