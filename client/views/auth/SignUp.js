import React, { Component } from 'react';
import HeaderContainer from '../../container/HeaderContainer.js';
import SignUpFormContainer from '../../container/SignUpFormContainer.js';

class SignUp extends Component {
    render() {
        return (
            <div>
                <HeaderContainer />
                <SignUpFormContainer />
            </div>
        );
    }
}


export default SignUp;
