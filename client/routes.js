import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import SignIn from './container/SignInFormContainer';
import SignUp from './container/SignUpFormContainer';
import Home from './components/home';
import Survey from './container/SurveyFormContainer';
import ImageUploader from './container/ImageUploadContainer';
import GetImage from './container/GetImageContainer';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="signIn" component={SignIn}/>
        <Route path="signUp" component={SignUp}/>
        <Route path="survey" component={Survey}/>
        <Route path="imageUploader" component={ImageUploader}/>
        <Route path="getImage" component={GetImage}/>
    </Route>
);
