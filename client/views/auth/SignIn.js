import React, { Component } from 'react';
import HeaderContainer from '../../container/HeaderContainer.js';
import SignInFormContainer from '../../container/SignInFormContainer.js';

class SignIn extends Component {
    render() {
        return (
            <div>
                <HeaderContainer type="posts_new"/>
                <SignInFormContainer />
            </div>
        );
    }
}


export default SignIn;
