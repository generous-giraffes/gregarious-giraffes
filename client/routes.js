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
    <Route path="/" component={App}>
        <IndexRoute component={SignIn}/>
        <Route path="/signIn" component={SignIn}/>
        <Route path="/signUp" component={SignUp}/>
        <Route path="/forgotPwd" component={ForgotPwd}/>
        <Route path="/validateEmail/:token" component={ValidateEmail}/>
    </Route>
);
