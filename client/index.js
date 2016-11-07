import React from 'react';
import ReactDOM from 'react-dom';
import {Router, browserHistory, Route} from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import SurveyForm from './views/survey/form';
import ImageUpload from './views/imageUpload/upload';
import ImageDownload from './views/imageUpload/getImage';

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
        <Route path='/' component={ImageDownload}>
          {/* <Route path='form' component={SurveyForm}/> */}
        </Route>
    </Router>
    , document.getElementById('app')
);
