import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {reducer as toastrReducer} from 'react-redux-toastr'
import ReduxToastr from 'react-redux-toastr'

import routes from './routes';
import reducers from './reducers'

const logger = createLogger();
// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        reducers,
        toastr: toastrReducer,
        routing: routerReducer
    }),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, promise, logger)
)

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history} routes={routes}/>
            <ReduxToastr
               timeOut={2000}
               newestOnTop={false}
               preventDuplicates={true}
               position="top-center"
               transitionIn="fadeIn"
               transitionOut="fadeOut"
              //  progressBar
            />
       </div>

    </Provider>,
    document.getElementById('app')
)
