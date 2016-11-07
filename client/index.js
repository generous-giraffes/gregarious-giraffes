import React from 'react';
import ReactDOM from 'react-dom';
import {Router, IndexRoute, browserHistory, Route} from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import Home from './views/home/home';
import SignIn from './views/login/signin';
import ForgotPwd from './views/login/forgot-password';
import ValidateEmail from './views/login/validate-email';
import SignUp from './views/login/signup';
import Dashboard from './views/dashboard/dashboard';



//let store = createStore(app)
//
//ReactDOM.render(
//    <Provider store={store}>
//        <App />
//    </Provider>,
//    document.getElementById('root')
//);

ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        {/* this is the default UI when visiting '/' */}
        <IndexRoute component={Home} />
        <Route path="signin" component={SignIn} />
        <Route path="forgotPwd" component={ForgotPwd} />
        <Route path="signup" component={SignUp} />
        <Route path="validateEmail/:token" component={ValidateEmail} />
        <Route path="dashboard" component={Dashboard} />
      </Route>
    </Router>
    ), document.getElementById('app')
);

