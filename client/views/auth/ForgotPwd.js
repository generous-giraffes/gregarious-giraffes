import React, { Component } from 'react';
import HeaderContainer from '../../container/HeaderContainer.js';
import ForgotPwdFormContainer from '../../container/ForgotPwdFormContainer.js';

class ForgotPwd extends Component {
    render() {
        return (
            <div>
                <HeaderContainer type="posts_new"/>
                <ForgotPwdFormContainer />
            </div>
        );
    }
}


export default ForgotPwd;
