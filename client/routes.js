import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SignIn from './container/SignInFormContainer';
import SignUp from './container/SignUpFormContainer';
import Home from './components/home';

export default (

            <Route path="/" component={App}>
                    <IndexRoute component={Home}/>
                    <Route path="signin" component={SignIn}/>
                    <Route path="signup" component={SignUp}/>
            </Route>
);
