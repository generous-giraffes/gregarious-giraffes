import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SignIn from './container/SignInFormContainer';
import SignUp from './container/SignUpFormContainer';
import Home from './components/home';
import Survey from './container/SurveyFormContainer';
import ImageUploader from './container/ImageUploadContainer';
import GetImage from './container/GetImageContainer';
import {requireAuthentication} from './container/AuthenticatedContainer';
import Chat from './components/Chat';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={SignUp}/>
        <Route path="signIn" component={SignIn}/>
        <Route path="signUp" component={SignUp}/>
        <Route path="dashboard" component={Home}/>
        <Route path="chat" component={Chat} />
        <Route path="survey" component={Survey} />
        <Route path="imageUploader" component={ImageUploader} />
        <Route path="getImage" component={GetImage} />
    </Route>
);
