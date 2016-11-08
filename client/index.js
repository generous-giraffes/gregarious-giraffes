//import React from 'react';
//import ReactDOM from 'react-dom';
//import { createStore, applyMiddleware, compose } from 'redux';
//import { Router, Route, browserHistory } from 'react-router';
//import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
//import ReduxPromise from 'redux-promise';
//import { Provider } from 'react-redux';
//import routes from './routes';
//import reducers from './reducers';
//
//const reduxRouterMiddleware = syncHistoryWithStore(browserHistory);
//const createStoreWithMiddleware = compose(applyMiddleware(ReduxPromise, reduxRouterMiddleware), window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
//const store = createStoreWithMiddleware(reducers);
//
//ReactDOM.render(
//    <Provider store={store}>
//        <Router history={browserHistory} routes={routes}/>
//    </Provider>
//    , document.getElementById('app'));


import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import routes from './routes';
import reducers from './reducers'

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    })
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
            <Router history={history} routes={routes}/>

    </Provider>,
    document.getElementById('app')
)
