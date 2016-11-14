import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SignIn from './container/SignInFormContainer';
import SignUp from './container/SignUpFormContainer';
import Dashboard from './components/dashboard';
import Survey from './container/SurveyFormContainer';
import ImageUploader from './container/ImageUploadContainer';
import GetImage from './container/GetImageContainer';
import MyProfile from './container/profileContainer';
import SimpleMapPage from './container/map';
import {requireAuthentication} from './container/AuthenticatedContainer';
import Chat from './components/Chat';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={SignUp}/>
        <Route path="signIn" component={SignIn}/>
        <Route path="signUp" component={SignUp}/>
        <Route path="dashboard" component={requireAuthentication(Dashboard)}/>
        <Route path="survey" component={requireAuthentication(Survey)} />
        <Route path="chat" component={Chat} />
        <Route path="imageUploader" component={ImageUploader} />
        <Route path="getImage" component={GetImage} />
        <Route path="myProfile" component={MyProfile} />
        <Route path="map" component={SimpleMapPage} />
    </Route>
);
