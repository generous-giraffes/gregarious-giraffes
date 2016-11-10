import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signinUser } from '../actions/auth';

//FieldGroup returns a bootstrap form
const FieldGroup = ({ id, label, help, ...props }) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

class SigninForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onEmailChange(event) {
        this.setState({email: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    onFormSubmit(event) {
        console.log(event);
        event.preventDefault();
        this.props.signinUser(this.state.email, this.state.password);
        this.setState({
            email: '',
            password: ''
        });
    }

    render() {

        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <FieldGroup
                        type='text'
                        label='Email Address'
                        placeholder='Email Address'
                        value={this.state.email}
                        onChange={this.onEmailChange}/>
                    <FieldGroup
                        type='password'
                        label='Password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.onPasswordChange}/>
                    <Button bsStyle="primary" type="submit" value="Submit">Enter</Button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signinUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(SigninForm);
