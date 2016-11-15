import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';

import SignUp from './container/Auth/SignUpFormContainer';
import Dashboard from './components/Dashboard';
import Survey from './container/User/SurveyFormContainer';
import ImageUploader from './container/User/ImageUploadContainer';
import GetImage from './container/User/GetImageContainer';
import MyProfile from './container/Profile/ProfileContainer';
import Events from './components/Events';
import SimpleMapPage from './container/Features/MapContainer';
import {requireAuthentication} from './container/Auth/AuthenticatedContainer';
import Chat from './container/Features/ChatContainer';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={SignUp}/>
        <Route path="signIn" component={SignIn}/>
        <Route path="signUp" component={SignUp}/>
        <Route path="dashboard" component={Dashboard}/>
        <Route path="survey" component={requireAuthentication(Survey)} />
        <Route path="chat" component={Chat} />
        <Route path="imageUploader" component={ImageUploader} />
        <Route path="getImage" component={GetImage} />
        <Route path="myProfile" component={MyProfile} />
        <Route path="map" component={SimpleMapPage} />
        <Route path="events" component={Events}/>
    </Route>
);
