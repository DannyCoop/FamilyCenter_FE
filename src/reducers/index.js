import familyReducer from './familyReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    family: familyReducer
});

export default rootReducer