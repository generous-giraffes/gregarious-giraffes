import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import SignUp from './container/Auth/SignUpFormContainer';
import SignIn from './container/Auth/SignInFormContainer';
import Dashboard from './components/dashboard';
import Survey from './container/User/SurveyFormContainer';
import ImageUploader from './container/User/ImageUploadContainer';
import Profile from './components/Profile';
import FriendProfile from './components/FriendProfile';
import Events from './components/Events';
import SimpleMapPage from './container/Features/MapContainer';
import {requireAuthentication} from './container/Auth/AuthenticatedContainer';
import Chat from './container/Features/ChatContainer';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={SignUp}/>
        <Route path="signIn" component={SignIn}/>
        <Route path="signUp" component={SignUp}/>
        <Route path="dashboard" component={requireAuthentication(Dashboard)}/>
        <Route path="survey" component={requireAuthentication(Survey)} />
        <Route path="chat" component={requireAuthentication(Chat)} />
        <Route path="imageUploader" component={requireAuthentication(ImageUploader)} />
        <Route path="myProfile" component={requireAuthentication(Profile)} />
        <Route path="friendProfile" component={requireAuthentication(FriendProfile)} />
        <Route path="map" component={requireAuthentication(SimpleMapPage)} />
        <Route path="events" component={requireAuthentication(Events)}/>
    </Route>
);
