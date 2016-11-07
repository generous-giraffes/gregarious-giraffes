import React, { Component } from 'react';
import HeaderContainer from '../../container/HeaderContainer.js';
import ValidateEmailAlertContainer from '../../container/ValidateEmailAlertContainer.js';

class ValidateEmail extends Component {
    render() {
        return (
            <div>
                <HeaderContainer />
                <ValidateEmailAlertContainer token={this.props.params.token} autoValidateToken={true}/>
            </div>
        );
    }
}


export default ValidateEmail;
