import familyReducer from './familyReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    family: familyReducer,
    users: userReducer
});

export default rootReducer