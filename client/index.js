import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory, Route} from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';


//let store = createStore(app)
//
//ReactDOM.render(
//    <Provider store={store}>
//        <App />
//    </Provider>,
//    document.getElementById('root')
//);

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App}/>
    </Router>
    , document.getElementById('app')
);

