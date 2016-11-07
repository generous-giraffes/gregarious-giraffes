import React, { Component } from 'react';
import HeaderContainer from '../../container/HeaderContainer.js';
import SignInFormContainer from '../../container/SignInFormContainer.js';

class SignIn extends Component {
    render() {
        return (
            <div>
                <HeaderContainer />
                <SignInFormContainer />
            </div>
        );
    }
}


export default SignIn;
