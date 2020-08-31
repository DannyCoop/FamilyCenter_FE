import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import { Provider } from 'react-redux'
import { createStore } from 'redux'
// import thunk from 'redux-thunk'
import rootReducer from './reducers'
//
//import reducers here
//


const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

