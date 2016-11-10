import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { signupUser } from '../actions/auth';
//need to include the signupuser above in order to dispatch the bindActionCreators

//FieldGroup returns a bootstrap form
const FieldGroup = ({ id, label, help, ...props }) => {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
        </FormGroup>
    );
}

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        };
        this.onNameCreate = this.onNameCreate.bind(this);
        this.onEmailCreate = this.onEmailCreate.bind(this);
        this.onPasswordCreate = this.onPasswordCreate.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    //user creating their name to create a new user
    onNameCreate(event) {
        this.setState({name: event.target.value});
    }

    //user creating their email to create a new user
    onEmailCreate(event) {
        this.setState({email: event.target.value});
    }

    //user creating their password to create a new user
    onPasswordCreate(event) {
        this.setState({password: event.target.value});
    }

    //user submitting their form to create a new user
    onFormSubmit(event) {
        console.log(event, 'LINE 49, SignUpFormContainer this is the form submission event to create a new user');
        event.preventDefault();
        //need this from signUpUser or won't have the data
        this.props.signupUser(this.state.name, this.state.email, this.state.password);
        this.setState({
            name: '',
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
                        label='Name'
                        placeholder='Name'
                        value={this.state.name}
                        onChange={this.onNameCreate}/>
                    <FieldGroup
                        type='email'
                        label='Email Address'
                        placeholder='Email Address'
                        value={this.state.email}
                        onChange={this.onEmailCreate}/>
                    <FieldGroup
                        type='password'
                        label='Password'
                        placeholder='Password'
                        value={this.state.password}
                        onChange={this.onPasswordCreate}/>
                    <Button bsStyle="primary" type="submit" value="Submit">Enter</Button>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signupUser}, dispatch);
}

export default connect(null, mapDispatchToProps)(SignupForm);
