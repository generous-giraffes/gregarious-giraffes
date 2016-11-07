import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import SignIn from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';
import ForgotPwd from './views/auth/ForgotPwd';
import Dashboard from './views/auth/dashboard';
import ValidateEmail from './views/auth/ValidateEmail';
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
                    <Route path="dashboard" component={Dashboard}/>
            </Route>
    </Router>
);
