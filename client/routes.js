import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './views/auth/App';
import SignIn from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';
import ForgotPwd from './views/auth/ForgotPwd';
import ValidateEmail from './views/auth/ValidateEmail';

export default (

            <Route path="/" component={App}>
                    <IndexRoute component={SignIn}/>
                    <Route path="/signin" component={SignIn}/>
                    <Route path="/forgotPwd" component={ForgotPwd}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/validateEmail/:token" component={ValidateEmail}/>
            </Route>
);
