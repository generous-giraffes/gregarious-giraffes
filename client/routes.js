import React from 'react';
import {Router, IndexRoute, browserHistory, Route} from 'react-router';
import App from './components/App';
import SignIn from './views/login/SignIn';
import SignUp from './views/auth/SignUp';
import ForgotPwd from './views/auth/ForgotPwd';
import ValidateEmail from './views/auth/ValidateEmail';
import Home from './views/home/home';
import configureStore from './store/configureStore.js';


export default (
    <Router history={browserHistory}>
            <Route path="/" component={App}>
                    {/* this is the default UI when visiting '/' */}
                    <IndexRoute component={Home}/>
                    <Route path="signin" component={SignIn}/>
                    <Route path="forgotPwd" component={ForgotPwd}/>
                    <Route path="signup" component={SignUp}/>
                    <Route path="validateEmail/:token" component={ValidateEmail}/>
            </Route>
    </Router>
);
